using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using AutoMapper;
using API.Repositories.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceRepository _placeRepository;
        private readonly IMapper _mapper;

        public PlacesController(IPlaceRepository placeRepository, IMapper mapper)
        {
            _placeRepository = placeRepository;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreatePlace(CreatePlaceDto placeDto)
        {
            
            Place place = new()
            {
                Location = placeDto.Location,
                Country = placeDto.Country,
                City = placeDto.City,
                Category = placeDto.Category,
                AppUserId = placeDto.AppUserId,
                Name = placeDto.Name
            };
            await _placeRepository.Add(place);
            return Ok();
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetPlaces()
        {
            var places = await _placeRepository.GetAll();
            return Ok(places);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetPlace(int id)
        {
            var place = await _placeRepository.GetPlaceById(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlace(int id, UpdatePlaceDto placeDto)
        {
            Place place = new()
            {
                PlaceId = id,
                Country = placeDto.Country,
                City = placeDto.City,
                Location = placeDto.Location,
                Category = placeDto.Category,
                Name = placeDto.Name
            };

            await _placeRepository.Update(place);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            await _placeRepository.Delete(id);
            return Ok();
        }
    }
}
