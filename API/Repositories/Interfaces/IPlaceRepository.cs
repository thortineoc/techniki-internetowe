using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IPlaceRepository
    {
        Task<Place> GetPlaceById(int id);

        Task<IEnumerable<Place>> GetAll();

        Task Add(Place place);

        Task Delete(int id);

        Task Update(Place place);
    }
}
