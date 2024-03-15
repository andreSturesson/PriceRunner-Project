
using backend.Repository.Interfaces;

namespace backend.Repository
{

  public class ProductRepository : IProductRepository
  {
    private readonly IConfiguration _configuration;

    public ProductRepository(IConfiguration configuration)
    {
      _configuration = configuration;
    }

  }
}