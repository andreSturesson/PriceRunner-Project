

namespace backend.Database
{
  using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
  using Microsoft.EntityFrameworkCore;
  using backend.Model;

  public class WishlistWizardContext : IdentityDbContext<User>
  {
    private string _connectionString;

    public WishlistWizardContext(DbContextOptions<WishlistWizardContext> options) : base(options)
    {
      var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
      _connectionString = configuration.GetValue<string>("ConnectionStrings:DefaultConnection")!;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>().HasOne(u => u.Wishlist).WithOne(w => w.User).HasForeignKey<Wishlist>(w => w.UserId);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Wishlist> Wishlists { get; set; }
    public DbSet<Product> Products { get; set; }

  }
}