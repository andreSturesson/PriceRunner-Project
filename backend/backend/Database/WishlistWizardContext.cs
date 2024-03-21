

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

      // CsvPopulater seeder = new CsvPopulater(this, "./data/amazon_products.csv", "./data/amazon_categories.csv");
      // seeder.PushDataToDb();
    }

    public void SeedData()
    {
      CsvPopulater seeder = new CsvPopulater(this, "./data/amazon_products.csv", "./data/amazon_categories.csv");
      seeder.PushDataToDb();
      SaveChanges();
    }

    public DbSet<User> Accounts { get; set; }
    public DbSet<Wishlist> Wishlists { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Review> Reviews { get; set; }

  }
}