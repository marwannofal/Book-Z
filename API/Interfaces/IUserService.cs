using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<bool> UpdateUserAsync(int id, UpdateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(int id);
        Task<int> AddBookToUserAsync(int userId,  Book book);
        Task<User> GetUserWithBooksAsync(int userId);
    }
}