using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
//=====================================get all users=============================================
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }
//==============================get user by id====================================================

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
//=====================================update user=============================================
        // PUT: api/users/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutUser(int id, UpdateUserDto updateUserDto)
        {
             if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.UpdateUserAsync(id, updateUserDto);
            if (!result)
                return NotFound();
            

            return NoContent();
        }
//=====================================Delete user=============================================
        // DELETE: api/users/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
//===============================Get User With Books============================================
        // Get User With Books: api/users/5/withbooks
        [HttpGet("{userId}/withBooks")]
        public async Task<ActionResult<UserDto>> GetUserWithBooksAsync(int userId)
        {
            try
            {
                var user = await _userService.GetUserWithBooksAsync(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
//=====================================Add Book To User===========================================
        //Add Book To User: api/users/5/books
        [HttpPost("{userId}/books")]
        public async Task<ActionResult> AddBookToUserAsync(int userId, [FromBody] BookDTO bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Book data is missing or invalid.");
            }
            try
            {
                var book = _mapper.Map<Book>(bookDto);
                var bookId = await _userService.AddBookToUserAsync(userId, book);
                return CreatedAtRoute("GetBook", new { id = bookId }, bookDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    } 
}