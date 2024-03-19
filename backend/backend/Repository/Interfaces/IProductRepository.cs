
using backend.Model;

namespace backend.Repository.Interfaces
{
  public interface IProductRepository
  {
    Task<Product> GetProductById(int id);
    Task<IEnumerable<Product>> GetProducts(string? query = null, int categoryId = 0, int page = 1, int limit = 10);
  }
}
