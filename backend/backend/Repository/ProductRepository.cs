
using backend.Database;
using backend.Model;
using backend.Repository.Interfaces;
using backend.View.DTOs;
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

    public Task<Product> GetProductById(string id)
    {
      return _context.Products
        .Include(p => p.Category)
        .FirstOrDefaultAsync(p => p.Id == id) ?? throw new Exception("Product not found");
    }


    public async Task<ProductWithPaginationDTO> GetProducts(string? query = null, int categoryId = 0, int page = 1, int limit = 10)
    {
      IQueryable<Product> products = _context.Products;

      if (!string.IsNullOrEmpty(query))
      {
        products = products.Where(p => p.Title.Contains(query) || p.Category.Name.Contains(query));
      }

      if (categoryId != 0)
      {
        products = products.Where(p => p.CategoryId == categoryId);
      }

      int totalProducts = await products.CountAsync();
      int totalPages = (int)Math.Ceiling((double)totalProducts / limit);

      products = products.OrderBy(p => p.Id)
                 .Skip((page - 1) * limit)
                 .Take(limit)
                 .Include(p => p.Category);

      var ret = await products.ToListAsync();
      return new ProductWithPaginationDTO(totalPages, totalProducts, ret);
    }

  }
}