
using backend.Model;
using backend.Repository.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace backend.Repository
{

  public class UserRepository : IUserRepository
  {
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;

    public UserRepository(IConfiguration configuration, UserManager<User> userManager)
    {
      _configuration = configuration;
      _userManager = userManager;
    }
  }
}