using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public UserService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            var users = await _context.User.ToListAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }   

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.User.FindAsync(id);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<bool> UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _mapper.Map(updateUserDto, user);
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
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        public async Task<int> AddBookToUserAsync(int userId, Book book)
        {
            if (book == null) throw new ArgumentNullException(nameof(book));

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

            user.Books.Add(book);
            await _context.SaveChangesAsync();

            return book.Id;
        }

        public async Task<UserDto> GetUserWithBooksAndRatingAsync(int userId)
        {
            
            var user = await _context.User
                .Include(u => u.Books)
                .Include(u => u.Ratings)
                .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null) throw new KeyNotFoundException("User not found");

            return _mapper.Map<UserDto>(user);
        }
        
        public async Task<int> AddRatingToUserAsync(int userId, RatingDto ratingDto)
        {
            var user = await _context.User.Include(u => u.Ratings).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) throw new KeyNotFoundException("User not found");

            var rating = _mapper.Map<Rating>(ratingDto);
            user.Ratings.Add(rating);

            await _context.SaveChangesAsync();
            return rating.Id;
        }
    }
}