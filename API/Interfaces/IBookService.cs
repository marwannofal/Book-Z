using API.DTOs;

namespace API.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDTO>> GetAllBooksAsync();
        Task<BookDTO> GetBookByIdAsync(int id);
        Task<int> AddBookAsync(BookDTO book);
        Task<bool> UpdateBookAsync(int id,BookDTO book);
        Task<bool> DeleteBookAsync(int id);
    }
}