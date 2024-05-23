using API.Data;
using API.Interfaces;
using API.Services;
using Google.Cloud.Storage.V1;
using Microsoft.EntityFrameworkCore;


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
                options.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Book-Z;Integrated Security=True");
            });
            services.AddCors();
            services.AddLogging();
            services.AddAutoMapper(typeof(Program).Assembly);
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<ImageService>();
            // Register Google Cloud Storage client
            services.AddSingleton(StorageClient.Create());
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new ConditionConverter());
            });
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000") 
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            return services;
        }
    }
}