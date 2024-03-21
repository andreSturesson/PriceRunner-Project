

using backend.Model;
using backend.Repository;
using Microsoft.OpenApi.Models;
using backend.Database;
using backend.Repository.Interfaces;
using backend.View.Endpoints;
using Swashbuckle.AspNetCore.Filters;

namespace NoteHarbor
{
    public class Program
    {
        private const string DatabaseFlagPath = "./data/database.flag";
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                        .WithOrigins("http://localhost:5173", "http://localhost:5111", "http://localhost:5223")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<User>()
                .AddEntityFrameworkStores<WishlistWizardContext>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Wishlist Wizzard - API", Version = "v1" });
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });
            builder.Services.AddDbContext<WishlistWizardContext>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<IWishlistRepository, WishListRepository>();
            builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
            var app = builder.Build();

            if (!File.Exists(DatabaseFlagPath))
            {
                using (var scope = app.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var context = services.GetRequiredService<WishlistWizardContext>();
                    context.Database.EnsureCreated();
                    var csvPopulater = new CsvPopulater(context, "./data/amazon_products.csv", "./data/amazon_categories.csv");
                    csvPopulater.PushDataToDb();
                    File.Create(DatabaseFlagPath);
                }
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAll");

            app.MapIdentityApi<User>();

            app.UseHttpsRedirection();
            app.ConfigureWishListEndpoint();
            app.ConfigureCategoriesEndpoints();
            app.ConfigureProductEndpoint();
            app.ConfigureUsersEndpoints();
            app.ConfigureReviewEndpoint();
            app.Run();
        }
    }
}