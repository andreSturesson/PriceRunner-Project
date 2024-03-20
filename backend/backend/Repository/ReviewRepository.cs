
using backend.Database;
using backend.Model;
using backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{

  public class ReviewRepository : IReviewRepository
  {

    private readonly WishlistWizardContext _context;

    public ReviewRepository(WishlistWizardContext context)
    {
      _context = context;
    }

    public async Task<Review> AddReview(int productId, string userId, string Title, string Content, int Rating)
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw new Exception("User not found");
      var review = new Review
      {
        ProductId = productId,
        UserId = user.Id,
        Title = Title,
        Content = Content,
        Rating = Rating
      };
      _context.Reviews.Add(review);
      await _context.SaveChangesAsync();
      return review;
    }

    public async Task<Review> DeleteReview(int reviewId)
    {
      var review = await GetReviewById(reviewId);
      _context.Reviews.Remove(review);
      await _context.SaveChangesAsync();
      return review;
    }

    public async Task<Review> GetReviewById(int reviewId)
    {
      return await _context.Reviews
          .Include(r => r.User)
          .FirstOrDefaultAsync(r => r.Id == reviewId) ?? throw new Exception("Review not found");

    }

    public async Task<IEnumerable<Review>> GetReviews(int productId)
    {
      return await _context.Reviews
          .Include(r => r.User)
          .Where(r => r.ProductId == productId)
          .ToListAsync();
    }

    public async Task<Review> UpdateReview(int reviewId, string Title, string Content, int Rating)
    {
      var review = await GetReviewById(reviewId);
      review.Title = Title;
      review.Content = Content;
      review.Rating = Rating;
      await _context.SaveChangesAsync();
      return review;
    }
  }
}