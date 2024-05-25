using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<bool> UpdateUserAsync(int id, UserDto updateUserDto);
        Task<bool> DeleteUserAsync(int id);
        Task<int> AddBookToUserAsync(int userId,  Book book);
        Task<UserDto> GetUserWithBooksAndRatingAsync(int userId);
        Task<int> AddRatingToUserAsync(int userId,  RatingDto ratingDto);
        Task<bool> UpdateUserImageAsync(int id, string imageUrl);
        Task ResetPasswordAsync(string username, string newPassword);
    }
}