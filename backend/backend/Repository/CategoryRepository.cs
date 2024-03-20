using backend.Database;
using backend.Model;
using backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class CategoryRepository : ICategoryRepository
  {
    

        private readonly WishlistWizardContext _context;

        public CategoryRepository(WishlistWizardContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Category>> GetCategories()
        {
            IQueryable<Category> categories = _context.Categories;

            return await categories.ToListAsync();

            
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Category not found");
            return category;

        }
  }
}