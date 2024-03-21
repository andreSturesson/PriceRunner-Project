
using backend.Database;
using backend.Model;
using backend.Repository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{

  public class WishListRepository : IWishlistRepository
  {

    private readonly WishlistWizardContext _context;
    public WishListRepository(WishlistWizardContext context)
    {
      _context = context;
    }

    public async Task<Wishlist> AddItemToWishlist(string userId, string productId)
    {
      var wishlist = await _context.Wishlists
          .Include(w => w.Products)
          .ThenInclude(p => p.Category)
          .FirstOrDefaultAsync(w => w.UserId == userId) ?? throw new Exception("Wishlist not found");
      var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId) ?? throw new Exception("Product not found");
      wishlist.Products.Add(product);
      _context.Update(wishlist);
      await _context.SaveChangesAsync();
      return wishlist;
    }

    public async Task<Wishlist> GetWishlist(string userId)
    {
      var wish = await _context.Wishlists
          .Include(w => w.Products)
          .ThenInclude(p => p.Category)
          .FirstOrDefaultAsync(w => w.UserId == userId) ?? throw new Exception("Wishlist not found");
      return wish;
    }

    public async Task<Product> RemoveItemFromWishlist(string userId, string productId)
    {
      var wishlist = await _context.Wishlists
          .Include(w => w.Products)
          .ThenInclude(p => p.Category)
          .FirstOrDefaultAsync(w => w.UserId == userId) ?? throw new Exception("Wishlist not found");
      var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId) ?? throw new Exception("Product not found");
      wishlist.Products.Remove(product);
      _context.Update(wishlist);
      await _context.SaveChangesAsync();
      return product;
    }


  }
}