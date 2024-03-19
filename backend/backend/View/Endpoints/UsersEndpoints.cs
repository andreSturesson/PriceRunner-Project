
using backend.Model;
using backend.Repository;
using backend.Repository.Interfaces;
using backend.Utilities;
using backend.View.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class UsersEndpoints
  {
    public static void ConfigureUsersEndpoints(this WebApplication users)
    {
      users.MapGroup("/user");
      users.MapPost("/user/register", Register);
      users.MapGet("/user", GetUser);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public static async Task<IResult> Register(IUserRepository repository, RegisterPayload payload, [FromServices] UserManager<User> userManager)
    {

      if (string.IsNullOrEmpty(payload.Email))
      {
        return Results.BadRequest(new { Error = "Email is required" });
      }

      if (string.IsNullOrEmpty(payload.Password))
      {
        return Results.BadRequest(new { Error = "Password is required" });
      }

      var user = new User
      {
        Email = payload.Email,
        UserName = payload.UserName,
        FirstName = payload.FirstName,
        LastName = payload.LastName,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
      };

      var result = await userManager.CreateAsync(user, payload.Password);

      if (result.Succeeded)
      {
        return Results.Ok(new Error(Status.Ok, "Created"));
      }

      return Results.BadRequest(result.Errors.Select(e => e.Description).ToList());
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [Authorize]
    public static async Task<IResult> GetUser([FromServices] UserManager<User> userManager, [FromServices] IHttpContextAccessor httpContext)
    {
      var user = await userManager.GetUserAsync(httpContext.HttpContext.User);
      return TypedResults.Ok(new UserDTO(user));
    }

  }
}