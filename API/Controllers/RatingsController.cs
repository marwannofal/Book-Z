using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RatingsController : BaseApiController
    {
        private readonly IRatingService _ratingService;
        private readonly IMapper _mapper;
        public RatingsController(IRatingService ratingService, IMapper mapper)
        {
            _ratingService = ratingService;
            _mapper = mapper;
        }
//=====================================get all Ratings=============================================
        // get all Ratings : api/ratings
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetRatings()
        {
            var ratings = await _ratingService.GetAllRatingAsync();
            return Ok(ratings);
        }
//==============================get Rating by id====================================================
        // get Rating by id: api/ratings/3006
        [HttpGet("{id}", Name = "GetRating")]
        public async Task<ActionResult<RatingDto>> GetRating(int id)
        {
            var rating = await _ratingService.GetRatingByIdAsync(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }
//=======================================Add Book===================================================
        //Add: api/ratings/add
        [HttpPost("add")]
        public async Task<IActionResult> AddRating([FromBody] RatingDto ratingDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var ratingId = await _ratingService.AddRatingAsync(ratingDto);
                return CreatedAtAction(nameof(GetRating), new { id = ratingId }, ratingDto);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add rating");
            }
        }
    }
}