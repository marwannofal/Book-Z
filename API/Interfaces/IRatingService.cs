using API.DTOs;

namespace API.Interfaces
{
    public interface IRatingService
    {
        Task<IEnumerable<RatingDto>> GetAllRatingAsync();
        Task<RatingDto> GetRatingByIdAsync(int id);
        Task<int> AddRatingAsync(RatingDto ratingDto);
        
    }
}