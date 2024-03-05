using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff_Scheduler_Backend.Models;
using Staff_Scheduler_Backend.Services;

namespace Staff_Scheduler_Backend.Controllers
{
    public class CommunicationController : Controller
    {

        private readonly EmployeeService _employeeService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CommunicationController(EmployeeService employeeService, IHttpContextAccessor httpContextAccessor)
        {
            _employeeService = employeeService;
            _httpContextAccessor = httpContextAccessor;

        }

       


        [HttpPost("latestBroadCastMessage")]
        public IActionResult PostMessage([FromBody] messageModel payload)
        {
            // Log the received message
            try
            {
                Console.WriteLine(payload.message);
                int validate = _employeeService.broadcastMessage(payload.message);

                if (validate >= 1)
                {
                    return Ok(new { message = "success" });
                }
                else
                {
                    return Ok(new { message = "failure" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in BroadcastMessage: {ex.Message}");
                // Optionally, return a 500 Internal Server Error response
                return StatusCode(500, "Internal server error");
            }
        }
        [Authorize(Roles = "employee")]
        [HttpGet]
        [Route("getMessages")]
        public List<string> getAllMessages()
        {
            List<string> messages = _employeeService.getAllMessages();
            return messages;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("getPendingRequests")]
        public List<requestForm> getPendingRequests()
        {

            var token = HttpContext.Request.Headers.Authorization.FirstOrDefault()?.Split(" ").Last();

            // Log the bearer token
            Console.WriteLine($"Bearer Token: {token}");
            List<requestForm> pendinRequests = _employeeService.getPendingRequests();
            return pendinRequests;
        }
    }
}
