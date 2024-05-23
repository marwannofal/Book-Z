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

        public BookService(ApplicationDbContext context, IMapper mapper, ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;

        }
//=====================================================================
        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            var books = await _context.Books.ToListAsync();
            return _mapper.Map<IEnumerable<Book>>(books);
        }
        public async Task<Book> GetBookByIdAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return _mapper.Map<Book>(book);
        }

//=====================================================================
        public async Task<int> AddBookAsync(BookDTO bookDto)
        {
            if (bookDto == null)
            {
                throw new ArgumentNullException(nameof(bookDto));
            }

            string image = null;
            if (bookDto.Image != null)
            {
                image = await _imageService.UploadImageAsync(bookDto.Image);
            }

            var book = new Book
            {
                Title = bookDto.Title,
                Condition = bookDto.Condition,
                Description = bookDto.Description,
                Image = image
            };

            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

            return book.Id;
        }
//=====================================================================
        public async Task<bool> UpdateBookAsync(int id, BookDTO bookDto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return false;
            }

            _mapper.Map(bookDto, book);
            _context.Entry(book).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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
//=====================================================================
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
//=====================================================================
        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}