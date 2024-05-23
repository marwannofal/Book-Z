using API.DTOs;
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
        // Get all Book: https://localhost:5051/api/books
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }
//==============================get book by id====================================================
        // Get Book by id: https://localhost:5051/api/books/2
        [HttpGet("{id}", Name = "GetBook")]
        public async Task<ActionResult<BookDTO>> GetBook(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
//=====================================update book=============================================
        // PUT: https://localhost:5051/api/books/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutBook(int id, BookDTO bookDto)
        {
             if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _bookService.UpdateBookAsync(id, bookDto);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
//=====================================Delete book=============================================
        // DELETE: https://localhost:5051/api/books/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _bookService.DeleteBookAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
//=======================================Create Book===================================================
        //Add: https://localhost:5051/api/books/create
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
                
                return CreatedAtAction(nameof(GetBook), new { id = bookId }, bookDto);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add book");
            }
        }
    }
}