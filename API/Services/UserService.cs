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
            // Retrieve the user from the database
            var user = await _context.User.FindAsync(userId);

            // Add the book to the user's collection
            user.Books.Add(book);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return the ID of the added book
            return book.Id;
        }

        public async Task<User> GetUserWithBooksAsync(int userId)
        {
            return await _context.User.Include(u => u.Books).FirstOrDefaultAsync(u => u.Id == userId);
        }
        
    }
}