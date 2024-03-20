
using backend.Model;
using backend.Repository;
using backend.Repository.Interfaces;
using backend.Utilities;
using backend.View.DTOs;
using backend.View.Payloads;
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
      users.MapPut("/user", UpdateUser);
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

      Uri uriResult;
      bool urlResult = Uri.TryCreate(payload.ProfilePicture, UriKind.Absolute, out uriResult) &&
      (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
      if (!urlResult)
      {
        return Results.BadRequest(new { Error = "Not a valid url" });
      }

      var user = new User
      {
        Email = payload.Email,
        UserName = payload.UserName,
        FirstName = payload.FirstName,
        LastName = payload.LastName,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow,
        ProfilePicture = payload.ProfilePicture,
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
      if (user == null)
      {
        return Results.NotFound(new { Error = "User not found" });
      }

      return Results.Ok(new UserDTO(user));
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [Authorize]
    public static async Task<IResult> UpdateUser([FromServices] UserManager<User> userManager, [FromServices] IHttpContextAccessor httpContext, UpdateUserPayload payload)
    {
      var user = await userManager.GetUserAsync(httpContext.HttpContext.User);

      if (!string.IsNullOrEmpty(payload.FirstName))
      {
        user.FirstName = payload.FirstName;
      }

      if (!string.IsNullOrEmpty(payload.LastName))
      {
        user.LastName = payload.LastName;
      }

      if (!string.IsNullOrEmpty(payload.ProfilePicture))
      {
        user.ProfilePicture = payload.ProfilePicture;
      }

      await userManager.UpdateAsync(user);
      return Results.Ok("User updated successfully!");
    }

  }
}