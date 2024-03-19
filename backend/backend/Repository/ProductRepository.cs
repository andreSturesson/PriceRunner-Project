
using backend.Database;
using backend.Model;
using backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{

  public class ProductRepository : IProductRepository
  {
    private readonly WishlistWizardContext _context;

    public ProductRepository(WishlistWizardContext context)
    {
      _context = context;
    }

    public async Task<Product> GetProductById(int id)
    {
      var post = await _context.Products.FirstOrDefaultAsync(p => p.Id == id) ?? throw new Exception("Product not found");
      return post;
    }

    public async Task<IEnumerable<Product>> GetProducts(string? query = null, int categoryId = 0, int page = 1, int limit = 10)
    {
      IQueryable<Product> products = _context.Products;

      if (!string.IsNullOrEmpty(query))
      {
        products = products.Where(p => p.Title.Contains(query));
      }

      if (categoryId != 0)
      {
        products = products.Where(p => p.CategoryId == categoryId);
      }

      products = products.OrderBy(p => p.Id).Skip((page - 1) * limit).Take(limit);
      products = products.Include(p => p.Category);

      return await products.ToListAsync();
    }
  }
}