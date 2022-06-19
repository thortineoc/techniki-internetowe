using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using AutoMapper;
using System.Linq;
using System.Security.Claims;
using API.Repositories.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public RatingController(IRatingRepository ratingRepository, IUserRepository userRepository, IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateRating(CreateRatingDto ratingDto)
        {
            
            Rating rating = new()
            {
                Rate = ratingDto.Rate,
                PlaceId = ratingDto.PlaceId,
                AppUserId = ratingDto.AppUserId,
            };
            await _ratingRepository.Add(rating);
            return Ok();
        }
        
        [HttpPut]
        public async Task<IActionResult> UpdateRating(CreateRatingDto ratingDto)
        {
            var user = await _userRepository.GetUserById(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            var userRate = await _ratingRepository.GetUsersRatingsById(user.Id);
            var rate = userRate.FirstOrDefault(r => r.PlaceId == ratingDto.PlaceId);
            if (rate is null)
            {
                await AddRate(ratingDto);
                return Ok();
            }
            rate.Rate = ratingDto.Rate;
            rate.PlaceId = ratingDto.PlaceId;
            rate.AppUserId = ratingDto.AppUserId;
            await _ratingRepository.Update(rate);
            return Ok();
        }

        private async Task AddRate(CreateRatingDto ratingDto)
        {
            var rate = new Rating()
            {
                Rate = ratingDto.Rate,
                PlaceId = ratingDto.PlaceId,
                AppUserId = ratingDto.AppUserId
            };
            await _ratingRepository.Add(rate);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetRating()
        {
            var ratings = await _ratingRepository.GetAll();
            return Ok(ratings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetRating(int id)
        {
            var rating = await _ratingRepository.GetRatingById(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            await _ratingRepository.Delete(id);
            return Ok();
        }
    }
}
