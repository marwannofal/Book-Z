using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CsrfController : BaseApiController
    {
        private readonly IAntiforgery _antiforgery;
        public CsrfController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }
//=================================== GET CSRF TOKEN ========================================================
        // GET: http://localhost:5050/api/csrf/GetCsrfToken
        [HttpGet("GetCsrfToken")]
        public IActionResult GetCsrfToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                new CookieOptions { HttpOnly = false });
            return new JsonResult(new { RequestToken = tokens.RequestToken });
        }   
    }
}