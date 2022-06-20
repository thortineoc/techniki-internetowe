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
using Microsoft.Extensions.Logging;

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
        private readonly ILogger<FavouriteController> _logger;

        public FavouriteController(IFavouriteRepository favouritesRepository, IPlaceRepository placeRepository,
            IUserRepository userRepository, ILogger<FavouriteController> logger, IMapper mapper)
        {
            _favouritesRepository = favouritesRepository;
            _placeRepository = placeRepository;
            _userRepository = userRepository;
            _logger = logger;
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
            var favsDtos = favs.Select(f =>
            {
                var favUser = _userRepository.GetUserById(f.UserId).Result;
                return new FavouriteDto()
                {
                    Id = f.FavouriteId,
                    Place = _placeRepository.GetPlaceById(f.PlaceId).Result,
                    User = new AppUserDto()
                    {
                        Id = favUser.Id,
                        UserName = favUser.UserName,
                        Email = favUser.Email
                    }
                };
            }).ToList();

            IList<FavouriteDto> dtoList = new List<FavouriteDto>();
            foreach (var t in favsDtos)
            {
                dtoList.Add(t);
            }

            return Ok(dtoList);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<FavouriteDto>>> GetFavourite(int userId)
        {
            var favs = await _favouritesRepository.GetUserFavouritesById(userId);
            if (favs == null)
            {
                return NotFound();
            }

            var favsDtoList = new List<FavouriteDto>();
            foreach (var f in favs)
            {
                var place = await _placeRepository.GetPlaceById(f.PlaceId);
                var user = await _userRepository.GetUserById(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
                favsDtoList.Add(new FavouriteDto()
                {
                    Id = f.FavouriteId,
                    User = new AppUserDto()
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email
                    },
                    Place = place
                });
            }

            return Ok(favsDtoList);
        }

        [HttpPut]
        public async Task<IActionResult> PutFavourite(UpdateFavouriteDto favDto)
        {
            var user = await _userRepository.GetUserById(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)));
            if (user.Id != favDto.UserId)
            {
                return Unauthorized("UserId mismatch");
            }

            var fav = (await _favouritesRepository.GetUserFavouritesById(user.Id))
                .FirstOrDefault(f => f.PlaceId == favDto.PlaceId);

            if (fav != null)
            {
                _logger.LogInformation("Updating favourite");
                await _favouritesRepository.Update(fav);
                return Ok();
            }

            _logger.LogInformation("Creating new favourite");
            Favourite newFav = new()
            {
                PlaceId = favDto.PlaceId,
                UserId = favDto.UserId
            };

            await _favouritesRepository.Add(newFav);
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