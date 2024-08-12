using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        private readonly IBookService _bookService;
        private readonly IUserService _userService;
        private readonly IExchangeService _exchangeService;
        public BooksController(IBookService bookService, IUserService userService, IExchangeService exchangeService)
        {
            _bookService = bookService;
            _userService = userService;
            _exchangeService = exchangeService;
        }
//=====================================get all books=============================================
        // Get all Book: http://localhost:5050/api/books
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }
//==============================get book by id====================================================
        // Get Book by id: http://localhost:5050/api/books/2
        [HttpGet("{id}", Name = "GetBook")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
//=====================================update book=============================================
        // PUT: http://localhost:5050/api/books/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromForm] BookDTO bookDto)
        {
            try
            {
                var result = await _bookService.UpdateBookAsync(id, bookDto);
                if (!result)
                {
                    return NotFound();
                }

                var updatedBook = await _bookService.GetBookByIdAsync(id);
                return Ok(updatedBook);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update book");
            }
        }
//=====================================Delete book=============================================
        // DELETE: http://localhost:5050/api/books/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _bookService.DeleteBookAsync(id);
            if (!result)
            {
                return NotFound(new { Message = "book not found." });
            }
            return Ok(new { Message = "book and related deleted successfully." });
        }
//=======================================Create Book===================================================
        //Add: http://localhost:5050/api/books/create
        [HttpPost("create")]
        public async Task<IActionResult> AddBook([FromForm] BookDTO bookDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var bookId = await _bookService.AddBookAsync(bookDto);
                var book = await _bookService.GetBookByIdAsync(bookId);

                if (book == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Failed to retrieve the added book");
                }

                return CreatedAtAction(nameof(GetBook), new { id = bookId }, book);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add book");
            }
        }
//=======================================Exchange Book===================================================
        //Post: http://localhost:5050/api/books/exchange/5
        [Authorize]
        [HttpPost("exchange/{bookId}")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> InitiateExchange(int bookId)
        {
            var currentUserId  = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
             
            if (!await _exchangeService.CanUserExchangeAsync(currentUserId))
            {
                return BadRequest("You have reached the maximum of 4 exchanges in the last 2 months.");
            }

            var book = await _bookService.GetBookByIdAsync(bookId);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            var bookOwner  = await _userService.GetUserByIdAsync(book.UserId);
            if (bookOwner == null || string.IsNullOrEmpty(bookOwner.PhoneNumber))
            {
                return BadRequest("User's phone number is not available.");
            }

            var ownerPhoneNumber  = bookOwner.PhoneNumber; 
            var internationalPhoneNumber = $"+962{ownerPhoneNumber.Substring(1)}";

            await _exchangeService.LogExchangeAsync(currentUserId, bookId);

            var message = $"Hello, I'm interested in exchanging the book '{book.Title}'.";
            var encodedMessage = Uri.EscapeDataString(message);
            var whatsappUrl = $"https://wa.me/{internationalPhoneNumber}?text={encodedMessage}";
            
            return Ok(new { RedirectUrl = whatsappUrl });
        }
//=======================================Search Book===================================================
        //Get: http://localhost:5050/api/books/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BookDTO>>> SearchBooks([FromQuery] string searchTerm)
        {
            var books = await _bookService.SearchBooksAsync(searchTerm);
            return Ok(books);
        }
    }
}