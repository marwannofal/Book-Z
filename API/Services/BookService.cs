using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Enum;
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
            var books = await _context.Books
            .Include(b => b.Images)
            .AsSplitQuery()
            .ToListAsync();
            return books;
        }
//================================================================================================
        public async Task<BookDTO> GetBookByIdAsync(int id)
        {
            var book = await _context.Books
            .Include(b => b.Images)
            .AsSplitQuery()
            .FirstOrDefaultAsync(b => b.Id == id);
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

            if (book.Images != null)
            {
                bookDto.ImageUrls = book.Images.Select(i => i.Url).ToList();
            }

            return bookDto;
        }
//================================================================================================
        public async Task<int> AddBookAsync(BookDTO bookDto)
        {
            Console.WriteLine("Starting AddBookAsync");

            var book = new Book
            {
                Title = bookDto.Title,
                Condition = bookDto.Condition,
                Description = bookDto.Description,
                Availability = bookDto.Availability,
                Category = bookDto.Category,
            };

            if (bookDto.Images != null && bookDto.Images.Any())
            {
                Console.WriteLine("Adding images to the book");
                var imageUrls = await _imageService.UploadImagesAsync(bookDto.Images);
                foreach (var url in imageUrls)
                {
                    book.Images.Add(new Image { Url = url });
                }
            }

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
            var book = await _context.Books
                .Include(b => b.Images)
                .AsSplitQuery()
                .FirstOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                return false; 
            }

            book.Title = bookDto.Title;
            book.Condition = bookDto.Condition;
            book.Description = bookDto.Description;
            book.Availability = bookDto.Availability;
            book.Category = bookDto.Category;

            if (bookDto.Images != null && bookDto.Images.Any())
            {
                _context.Images.RemoveRange(book.Images);
                book.Images.Clear();

                foreach (var image in bookDto.Images)
                {
                    try
                    {
                        var imageUrl = await _imageService.UploadImageAsync(image);
                        book.Images.Add(new Image { Url = imageUrl });
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Image upload failed: {ex.Message}");
                        throw;
                    }
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
//================================================================================================
        public async Task<IEnumerable<BookDTO>> SearchBooksAsync(string searchTerm)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                searchTerm = searchTerm.ToLower();
                Category? category = Enum.GetValues(typeof(Category))
                                            .Cast<Category>()
                                            .FirstOrDefault(c => c.ToString().ToLower() == searchTerm);
                query = query.Where(b =>
                    b.Title.ToLower().Equals(searchTerm) ||
                    (category.HasValue && b.Category == category.Value )
                );
            }

            var books = await query.ToListAsync();
            return _mapper.Map<IEnumerable<BookDTO>>(books);
        }

    }
}
