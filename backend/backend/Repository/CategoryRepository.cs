using backend.Repository.Interfaces;

namespace backend.Repository
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly IConfiguration _configuration;

    public CategoryRepository(IConfiguration configuration)
    {
      _configuration = configuration;
    }
  }
}