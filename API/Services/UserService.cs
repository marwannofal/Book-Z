using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public UserService(ApplicationDbContext context, IMapper mapper,
            ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }
//===========================================================================================
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            var users = await _context.User.ToListAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }   

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.User.Include(u => u.Ratings)
                .AsSplitQuery()
                .FirstOrDefaultAsync(u => u.Id == id);

            double averageRating = user.Ratings.Any() ? user.Ratings.Average(r => r.RatingValue) : 0.0;
            int decimalPlaces = 2 ;
            double roundedNumber = Math.Round(averageRating, decimalPlaces);

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                AverageRating = roundedNumber,
            };
        }
//===========================================================================================
        public async Task<bool> UpdateUserAsync(int id, UserDto userDto)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _mapper.Map(userDto, user);

            try
            {
                _context.User.Update(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                throw;
            }

            return true;
        }
//===========================================================================================
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.User
                .Include(u => u.Books)
                .Include(u => u.Ratings)
                .AsSplitQuery()
                .FirstOrDefaultAsync(u => u.Id == id);
                
            if (user == null)
            {
                return false;
            }

            if (user.Books != null && user.Books.Any())
            {
                _context.Books.RemoveRange(user.Books);
            }
            
            if (user.Ratings != null && user.Ratings.Any())
            {
                _context.Ratings.RemoveRange(user.Ratings);
            }

            // Remove the user
            _context.User.Remove(user);
            
            await _context.SaveChangesAsync();
            return true;
        }
//===========================================================================================
        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
//===========================================================================================
        public async Task<int> AddBookToUserAsync(int userId, Book book)
        {
            if (book == null) throw new ArgumentNullException(nameof(book));

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var user = await _context.User.Include(u => u.Books)
                                                .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    throw new ArgumentException($"User with ID {userId} not found.");
                }

                if (user.Books == null)
                {
                    user.Books = new List<Book>();
                }

                if (string.IsNullOrEmpty(book.Title))
                {
                    throw new ArgumentException("Book title is required.");
                }

                user.Books.Add(book);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return book.Id;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("An error occurred while adding a book to the user.", ex);
            }
        }
//===========================================================================================
        public async Task<UserDto> GetUserWithBooksAndRatingAsync(int userId)
        {
            
            var user = await _context.User
                .Include(u => u.Books)
                .Include(u => u.Ratings)
                .AsSplitQuery()
                .FirstOrDefaultAsync(u => u.Id == userId);
                
            if (user == null) throw new KeyNotFoundException("User not found");

            return _mapper.Map<UserDto>(user);
        }
//===========================================================================================
        public async Task<int> AddRatingToUserAsync(int userId, RatingDto ratingDto)
        {
            var user = await _context.User.Include(u => u.Ratings)
                                        .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var rating = _mapper.Map<Rating>(ratingDto);
            user.Ratings.Add(rating);

            await _context.SaveChangesAsync();
            return rating.Id;
        }
//===========================================================================================
        public async Task<bool> UpdateUserImageAsync(int id, string imageUrl)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            user.Image = imageUrl;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
            return true;
        }
//===========================================================================================
        public async Task ResetPasswordAsync(string username, string newPassword)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(newPassword));
            user.PasswordSalt = hmac.Key;

            await _context.SaveChangesAsync();
        }
    }
}