using backend.Model;

namespace backend.View.DTOs
{
  public class ReviewDTO
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public DateTime CreatedAt { get; set; }

    public ReviewDTO(Review review)
    {
      Id = review.Id;
      Title = review.Title;
      Content = review.Content;
      Rating = review.Rating;
      UserId = review.UserId;
      UserName = review.User.UserName;
      CreatedAt = review.CreatedAt;
    }

    public static ICollection<ReviewDTO> FromRepository(IEnumerable<Review> reviews)
    {
      return reviews.Select(r => new ReviewDTO(r)).ToList();
    }

  }

}
