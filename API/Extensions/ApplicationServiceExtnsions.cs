using System.ComponentModel;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using API.Entities.Enum;

namespace API.Extensions
{
    public static class ApplicationServiceExtnsions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            //connect the database with data entities and data in sql <3:
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000") 
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });
            services.AddLogging();
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<ImageService>();
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-CSRF-TOKEN";
            });
            services.AddControllersWithViews(); 
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new EnumConverter<Condition>());
                options.JsonSerializerOptions.Converters.Add(new EnumConverter<Availability>());
            });
            
            return services;
        }
    }
}