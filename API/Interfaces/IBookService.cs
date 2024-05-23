using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book> GetBookByIdAsync(int id);
        Task<int> AddBookAsync(BookDTO book);
        Task<bool> UpdateBookAsync(int id,BookDTO book);
        Task<bool> DeleteBookAsync(int id);
    }
}