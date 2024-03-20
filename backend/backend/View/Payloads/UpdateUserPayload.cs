namespace backend.View.Payloads
{
  public record UpdateUserPayload
  {
    public string Email { get; init; } = null!;
    public string UserName { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public string Password { get; init; } = null!;
    public string ProfilePicture { get; init; } = null!;
  }
}