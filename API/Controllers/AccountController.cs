using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(ApplicationDbContext context, ITokenService tokenService,
            ILogger<AccountController> logger)
        {
            _tokenService = tokenService;
            _context = context;
            _logger = logger;
        }
//===========================Register==============================================================
        // POST: http://localhost:5050/api/account/register
        [HttpPost("register")] 
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (registerDto.Password == null || registerDto.Email == null || registerDto.PhoneNumber == null)
            {
                _logger.LogError("Received null value in registerDto");
                return BadRequest("Invalid payload");
            }
            if (await UserExists(registerDto.Username))
            {
                _logger.LogWarning("Username {Username} is already taken", registerDto.Username);
                return BadRequest("Username is taken");
            }
            using var hmac = new HMACSHA512();

            var user = new User
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber
            };
            
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
//===========================Login==============================================================
        // POST: http://localhost:5050/api/account/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserDto userDto) 
        {
            var user = await _context.User
                .Include(u => u.Books)
                .Include(u => u.Ratings)
                .AsSplitQuery() 
                .SingleOrDefaultAsync(x => x.UserName == userDto.Username);
    
            if (user == null) return Unauthorized("invalid Username");
        
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

            for (int i = 0; i < ComputedHash.Length; i++) 
            {
                if (ComputedHash[i] != user.PasswordHash[i] ) return Unauthorized("invalid Password");
            }

            var books = user.Books.Select(b => new BookDTO
            {
                Id = b.Id,
                Title = b.Title,
                Condition = b.Condition,
                Description = b.Description,
                Availability = b.Availability,
                ImageUrl = b.Image
            }).ToList();

            double averageRating = user.Ratings.Any() ? user.Ratings.Average(r => r.RatingValue) : 0.0;
            int decimalPlaces = 2 ;
            double roundedNumber = Math.Round(averageRating, decimalPlaces);
            
            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                Books = books,
                AverageRating = roundedNumber,
                Token = _tokenService.CreateToken(user)
            }; 
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.User.AnyAsync(x => x.UserName == username.ToLower());
        }

        
    }
}