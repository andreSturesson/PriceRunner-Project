
using backend.Model;

namespace backend.Repository.Interfaces
{
  public interface IReviewRepository
  {
    Task<IEnumerable<Review>> GetReviews(int productId);
    Task<Review> GetReviewById(int reviewId);
    Task<Review> AddReview(int productId, string userId, string Title, string Content, int Rating);
    Task<Review> UpdateReview(int reviewId, string Title, string Content, int Rating);
    Task<Review> DeleteReview(int reviewId);
  }
}
