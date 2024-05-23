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

        public UsersController(IUserService userService, IMapper mapper, ImageService imageService)
        {
            _userService = userService;
            _mapper = mapper;
            _imageService = imageService;
        }
//=====================================get all users=============================================
        // get all users : https://localhost:5051/api/users
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }
//==============================get user by id====================================================
        // get user by id: https://localhost:5051/api/users/3006
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
        // PUT: https://localhost:5051/api/users/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutUser(int id, UserDto userDto)
        {
             if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.UpdateUserAsync(id, userDto);
            if (!result)
                return NotFound();
            

            return NoContent();
        }
//=====================================Delete user=============================================
        // DELETE: https://localhost:5051/api/users/delete/5
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
//===============================Get User With Books and Ratings============================================
        // Get User With Books: https://localhost:5051/api/users/5/withall
        [HttpGet("{userId}/withall")]
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
        //Add Book To User: https://localhost:5051/api/users/5/books
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
//=====================================Add Rating To User===========================================
        //Add Rating To User: https://localhost:5051/api/users/5/ratings
        [HttpPost("{userId}/ratings")]
        public async Task<ActionResult> AddRatingToUserAsync(int userId, [FromBody] RatingDto ratingDto)
        {
            if (ratingDto == null)
            {
                return BadRequest("Rating data is missing or invalid.");
            }

            try
            {
                var ratingId = await _userService.AddRatingToUserAsync(userId, ratingDto);
                return CreatedAtRoute("GetRating", new { id = ratingId }, ratingDto);
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
        //Add image To User: https://localhost:5051/api/users/5/uploaduserphoto
        [HttpPost("{id}/uploaduserphoto")]
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

            var ImageUrl = await _imageService.UploadImageAsync(imageUploadDto.Image);
            user.Image = ImageUrl;
            await _userService.UpdateUserAsync(id, user);


            return Ok(new { ImageUrl });
        }
    } 
}