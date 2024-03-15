
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class UsersEndpoints
  {
    public static void ConfigureUsersEndpoints(this WebApplication users)
    {
      users.MapGroup("/users");
      users.MapGet("/users", GetUsers);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public static async Task<IResult> GetUsers()
    {
      return Results.Ok();
    }
  }
}