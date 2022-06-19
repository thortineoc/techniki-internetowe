using API.Models;


using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repositories.Interfaces
{
    public interface IRatingRepository
    {
        Task<Rating> GetRatingById(int id);
        Task<IEnumerable<Rating>> GetUsersRatingsById(int userId);
        Task<IEnumerable<Rating>> GetAll();

        Task Add(Rating rating);

        Task Delete(int id);
        Task Update(Rating rating);
    }
}