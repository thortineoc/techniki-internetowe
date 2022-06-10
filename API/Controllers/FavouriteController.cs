using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.Repositories;
using API.Token;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using API.Repositories.Interfaces;
using AutoMapper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        private readonly IFavouriteRepository _favouritesRepository;
        private readonly IMapper _mapper;

        public FavouriteController(IFavouriteRepository favouritesRepository, IMapper mapper)
        {
            _favouritesRepository = favouritesRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavourite(FavouriteDto favDto)
        {

            Favourite fav = new()
            {
                PlaceId = favDto.PlaceId,
                UserId = favDto.UserId
            };
            await _favouritesRepository.Add(fav);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favourite>>> GetFavourites()
        {
            var favs = await _favouritesRepository.GetAll();
            return Ok(favs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Favourite>> GetFavourite(int id)
        {
            var place = await _favouritesRepository.GetFavouriteById(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavourite(int id, FavouriteDto favDto)
        {
            Favourite favs = new()
            {
                PlaceId = favDto.PlaceId,
                UserId = favDto.UserId
            };

            await _favouritesRepository.Update(favs);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            await _favouritesRepository.Delete(id);
            return Ok();
        }
    }
}
