using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> User{ get; set; }
        public DbSet<Book> Books { get; set;}
        public DbSet<Rating>  Ratings{ get; set; }
    }
}