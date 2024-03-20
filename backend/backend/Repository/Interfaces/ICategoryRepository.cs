using backend.Model;

namespace backend.Repository.Interfaces
{
  public interface ICategoryRepository
  {
        Task<IEnumerable<Category>> GetCategories();

        Task<Category> GetCategoryById(int id);

  }
}