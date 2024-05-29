using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    [ServiceFilter(typeof(ValidateCsrfTokenFilter))]
    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase
    {
        
    }
}