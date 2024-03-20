
namespace backend.View.Payloads
{
  public record CreateReviewPayload
  {
    public string Title { get; init; } = null!;
    public string Content { get; init; } = null!;
    public int Rating { get; init; }
  }
}