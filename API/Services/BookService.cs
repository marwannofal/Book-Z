using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class BookService : IBookService
    {
        private readonly ImageService _imageService;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
//================================================================================================
        public BookService(ApplicationDbContext context, IMapper mapper, ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }
//================================================================================================
        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            var books = await _context.Books.ToListAsync();
            return books;
        }
//================================================================================================
        public async Task<BookDTO> GetBookByIdAsync(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                return null;
            }

            var user = await _context.User
                .Where(u => u.Books.Any(b => b.Id == id))
                .Select(u => new { u.Id, u.UserName, u.PhoneNumber })
                .FirstOrDefaultAsync();

            var bookDto = _mapper.Map<BookDTO>(book);
            if (user != null)
            {
                bookDto.UserId = user.Id;
                bookDto.UserName = user.UserName;
                bookDto.PhoneNumber = user.PhoneNumber;
            }

            return bookDto;
        }
//================================================================================================
        public async Task<int> AddBookAsync(BookDTO bookDto)
        {
            string imageUrl = null;
            if (bookDto.Image != null)
            {
                try
                {
                    Console.WriteLine("Uploading image...");
                    imageUrl = await _imageService.UploadImageAsync(bookDto.Image);
                    Console.WriteLine($"Image uploaded: {imageUrl}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Image upload failed: {ex.Message}");
                    throw;
                }
            }

            var book = new Book
            {
                Id = bookDto.Id,
                Title = bookDto.Title,
                Condition = bookDto.Condition,
                Description = bookDto.Description,
                Availability = bookDto.Availability,
                Image = imageUrl
            };

            try
            {
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                Console.WriteLine("Book saved to database");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database save failed: {ex.Message}");
                throw;
            }

            return book.Id;
        }
//================================================================================================
        public async Task<bool> UpdateBookAsync(int id, BookDTO bookDto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return false; 
            }

            book.Title = bookDto.Title;
            book.Condition = bookDto.Condition;
            book.Description = bookDto.Description;
            book.Availability = bookDto.Availability;

            if (bookDto.Image != null)
            {
                try
                {
                    var imageUrl = await _imageService.UploadImageAsync(bookDto.Image);
                    book.Image = imageUrl;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Image upload failed: {ex.Message}");
                    throw;
                }
            }

            try
            {
                _context.Books.Update(book);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database update failed: {ex.Message}");
                throw;
            }

            return true;
        }
//================================================================================================
        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return false;
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
