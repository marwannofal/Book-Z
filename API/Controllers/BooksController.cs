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
        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
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
    }
}