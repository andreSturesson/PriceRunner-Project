
namespace backend.View.Payloads
{
  public record UpdateReviewPayload
  {
    public string Title { get; init; } = null!;
    public string Content { get; init; } = null!;
    public int Rating { get; init; }
  }
}