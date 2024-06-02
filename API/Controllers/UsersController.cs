using API.Data;
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
        private readonly ImageService _imageService;
        private readonly ApplicationDbContext _context;

        public UsersController(IUserService userService, IMapper mapper, ImageService imageService
            ,ApplicationDbContext context )
        {
            _userService = userService;
            _mapper = mapper;
            _imageService = imageService;
            _context = context;
        }
//=====================================get all users=============================================
        // get all users : http://localhost:5050/api/users
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }
//==============================get user by id====================================================
        // get user by id: http://localhost:5050/api/users/3006
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
        // PUT: http://localhost:5050/api/users/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            try
            {
                var result = await _userService.UpdateUserAsync(id, userDto);
                if (!result)
                {
                    return NotFound(new { Message = "User not found." });
                }
                return Ok(new { Message = "User updated successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update user");
            }
        }
//=====================================Delete user=============================================
        // DELETE: http://localhost:5050/api/users/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
            {
                return NotFound(new { Message = "User not found." });
            }
            return Ok(new { Message = "User and related entities deleted successfully." });
        }
//===============================Get User With Books and Ratings============================================
        // Get User With Books: http://localhost:5050/api/users/withall/5
        [HttpGet("withall/{userId}")]
        public async Task<ActionResult<UserDto>> GetUserWithBooksAndRatingAsync(int userId)
        {
            try
            {
                var userDto = await _userService.GetUserWithBooksAndRatingAsync(userId);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
//=====================================Add Book To User===========================================
        //Add Book To User: http://localhost:5050/api/users/books/5
        [HttpPost("books/{userId}")]
        public async Task<ActionResult> AddBookToUserAsync(int userId, [FromForm] BookDTO bookDto)
        {
            if (bookDto == null)
            {
                return BadRequest("Book data is missing or invalid.");
            }
            try
            {

                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var book = _mapper.Map<Book>(bookDto);

                if (bookDto.Image != null)
                {
                    var imageUrl = await _imageService.UploadImageAsync(bookDto.Image);
                    book.Image = imageUrl;
                }
                

                var bookId = await _userService.AddBookToUserAsync(userId, book);

                var responseDto = _mapper.Map<BookDTO>(book);
                responseDto.Id = bookId;
                responseDto.ImageUrl = book.Image;
                responseDto.UserId = userId;
                responseDto.UserName = user.Username;

                return CreatedAtRoute("GetBook", new { id = bookId }, responseDto);
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
//=====================================Add Rating To User===========================================
        //Add Rating To User: http://localhost:5050/api/users/ratings/5
        [HttpPost("ratings/{userId}")]
        public async Task<ActionResult> AddRatingToUserAsync(int userId, [FromBody] RatingDto ratingDto)
        {
            if (ratingDto == null)
            {
                return BadRequest("Rating data is missing or invalid.");
            }

            try
            {
                var ratingId = await _userService.AddRatingToUserAsync(userId, ratingDto);

                var createdRating = await _context.Ratings.FindAsync(ratingId);
                var responseDto = _mapper.Map<RatingDto>(createdRating);

                return CreatedAtRoute("GetRating", new { id = ratingId }, responseDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
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
//=====================================Add image To User===========================================
        //Add image To User: http://localhost:5050/api/users/uploaduserphoto/5
        [HttpPost("uploaduserphoto/{id}")]
        public async Task<IActionResult> UploadPhoto(int id, [FromForm] ImageUploadDto imageUploadDto)
        {
            if (imageUploadDto.Image == null || imageUploadDto.Image.Length == 0)
            {
                return BadRequest("No photo uploaded.");
            }

            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var imageUrl = await _imageService.UploadImageAsync(imageUploadDto.Image);
            user.Image = imageUrl;

            var updateResult = await _userService.UpdateUserImageAsync(id, imageUrl);
            if (!updateResult)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update user.");
            }

            return Ok(new { ImageUrl = imageUrl });
        }        
//=====================================reset-password===========================================
        //password reset: http://localhost:5050/api/users/reset/password
        [HttpPost("reset/password")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            try
            {
                await _userService.ResetPasswordAsync(dto.Username, dto.NewPassword);
                return Ok(new { Message = "Password has been reset successfully"});
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    } 
}