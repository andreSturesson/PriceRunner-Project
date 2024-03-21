
using backend.Model;
using backend.View.DTOs;

namespace backend.Repository.Interfaces
{
  public interface IProductRepository
  {
    Task<Product> GetProductById(string id);
    Task<ProductWithPaginationDTO> GetProducts(string? query = null, int categoryId = 0, int page = 1, int limit = 10);
  }
}
