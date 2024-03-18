
using backend.Model;

namespace backend.Repository.Interfaces
{
  public interface IProductRepository
  {
    Task<Product> GetProductById(int id);
    Task<IEnumerable<Product>> GetProducts();
  }
}
