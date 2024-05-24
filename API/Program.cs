using API.Extensions;

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
