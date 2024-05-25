using API.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServiceExtensions(builder.Configuration);

var app = builder.Build();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

// Set COEP headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Cross-Origin-Embedder-Policy", "require-corp");
    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin");
    await next();
});

app.UseHttpsRedirection();

app.UseStaticFiles(); // Enable serving static files from wwwroot

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
