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
        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
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
                return false; // Or throw an exception if you prefer
            }

            // Do not modify the Id
            book.Title = bookDto.Title;
            book.Condition = bookDto.Condition;
            book.Description = bookDto.Description;

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
