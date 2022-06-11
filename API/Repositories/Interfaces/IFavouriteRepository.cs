using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repositories.Interfaces
{
    public interface IFavouriteRepository
    {
        Task<Favourite> GetFavouriteById(int id);

        Task<IEnumerable<Favourite>> GetUserFavouritesById(int userId);

        Task<IEnumerable<Favourite>> GetAll();

        Task Add(Favourite favourite);

        Task Delete(int id);

        Task Update(Favourite favourite);
    }
}
