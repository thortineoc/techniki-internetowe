using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using AutoMapper;
using API.Repositories.Interfaces;
using api.Dtos;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavouriteController : ControllerBase
    {
        private readonly IFavouriteRepository _favouritesRepository;
        private readonly IPlaceRepository _placeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public FavouriteController(IFavouriteRepository favouritesRepository, IPlaceRepository placeRepository, IUserRepository userRepository, IMapper mapper)
        {
            _favouritesRepository = favouritesRepository;
            _placeRepository = placeRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavourite(UpdateFavouriteDto favDto)
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
        public async Task<ActionResult<IList<FavouriteDto>>> GetFavourites()
        {
            var favs = await _favouritesRepository.GetAll();
            var user = await _userRepository.GetUserById(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            var favsDtosTasks = favs.Select(async f => new FavouriteDto()
            {
                Place = await _placeRepository.GetPlaceById(f.PlaceId),
                User = new AppUserDto()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email
                }
            }).ToList();
            IList<FavouriteDto> dtoList = new List<FavouriteDto>();
            foreach (var t in favsDtosTasks)
            {
                dtoList.Add(await t);
            }
            return Ok(dtoList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FavouriteDto>> GetFavourite(int id)
        {
            var fav = await _favouritesRepository.GetFavouriteById(id);
            if (fav == null)
            {
                return NotFound();
            }
            var place = await _placeRepository.GetPlaceById(fav.PlaceId);
            var user = await _userRepository.GetUserById(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            var dto = new FavouriteDto()
            {
                User = new AppUserDto()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email
                },
                Place = place
            };
            return Ok(dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavourite(int id, UpdateFavouriteDto favDto)
        {
            Favourite favs = new()
            {
                FavouriteId = id,
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
