using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.Models;
using API.Repositories;
using API.Token;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Repositories;
using API.Models;
using API.Dtos;
using API.Repositories;
using API.Repositories.Interfaces;
using AutoMapper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IMapper _mapper;

        public RatingController(IRatingRepository ratingRepository, IMapper mapper)
        {
            _ratingRepository = ratingRepository;
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
