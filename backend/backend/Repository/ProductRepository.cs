
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

    public async Task<IEnumerable<Product>> GetProducts()
    {
      return await _context.Products.ToListAsync();
    }
  }
}