using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ValidateCsrfTokenFilter : IAsyncAuthorizationFilter
{
    private readonly IAntiforgery _antiforgery;

    public ValidateCsrfTokenFilter(IAntiforgery antiforgery)
    {
        _antiforgery = antiforgery;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var request = context.HttpContext.Request;
        if (request.Method.Equals("GET", StringComparison.OrdinalIgnoreCase) ||
            request.Method.Equals("HEAD", StringComparison.OrdinalIgnoreCase) ||
            request.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase) ||
            request.Method.Equals("TRACE", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        try
        {
            await _antiforgery.ValidateRequestAsync(context.HttpContext);
        }
        catch (AntiforgeryValidationException ex)
        {
            context.HttpContext.Response.Headers.Add("X-CSRF-Error", ex.Message);
            context.Result = new ForbidResult();
        }
    }
}
