using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Staff_Scheduler_Backend.Models;
using Staff_Scheduler_Backend.Services;
using Staff_Scheduler_Backend.Services.Interfaces;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Net;
namespace Staff_Scheduler_Backend.Controllers
{   

    public class EmployeeController : Controller
    {
        private readonly EmployeeService _employeeService;
        private IConfiguration _config;
        public EmployeeController(EmployeeService employeeService , IConfiguration configuration)
        {
            _employeeService = employeeService;
            _config = configuration; ;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        [Route("newEmployeeProfile")]
        public IActionResult CreateNewEmployee([FromBody] EmployeeDetails newEmployeeData)
        {
            Console.WriteLine(newEmployeeData.EmpID);
            try
            {
                EmployeeDetails findEmployee = _employeeService.getEmployeeDetailsWithID(newEmployeeData.EmpID);

                
                if (findEmployee != null && findEmployee.EmpID != "")
                    return Ok(new { message = "failure" });
                else
                {
                    string randomPassword = _employeeService.GenerateRandomString(5); 
                    Console.WriteLine(randomPassword); 
                    string hashedPassword = _employeeService.Encrypt(randomPassword);
                    string unhashedPassword = _employeeService.Decrypt(hashedPassword);

                            


                    if (1 == _employeeService.createNewEmployee(newEmployeeData) && 1== _employeeService.createNewEmployeeCred(newEmployeeData.EmpID,newEmployeeData.Role,hashedPassword))
                        return Ok(new { message = "success", password =randomPassword });
                }
                return Ok("success");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                // Return a failure message
                return Ok(new { message = "failure" });
            }
        }
        [Authorize(Roles = "employee,admin")]
        [HttpGet]
        [Route("/todaysSchedule/{id}")]
        public ActionResult<List<todaysSchedule>> GetEmployeeDetails(string id)
        {
            List<todaysSchedule> todaysSchedule = _employeeService.getTodaysSchedule(id);

            return Ok(todaysSchedule);
        }

        [Authorize(Roles = "employee,admin")]
        [HttpGet]
        [Route("/employees")]
        public ActionResult<List<EmployeeDetails>> GetEmployeeDetails()
        {
            List<EmployeeDetails> employeeList = _employeeService.getEmployeeDetails();

            return Ok(employeeList);
        }
        [Authorize(Roles = "employee,admin")]
        [HttpGet("/employees/{id}")]
        public ActionResult<EmployeeDetails> GetEmployeeDetailsById(string id)
        {
            EmployeeDetails employee = _employeeService.getEmployeeDetailsWithID(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpGet]
        [Route("swapSchedule/{empid}/{date}/{shift}")]
        public List<ScheduleDetails> GetTodaysSchedule(string empid, string date, string shift)
        {
            List<ScheduleDetails> swapSchedule = _employeeService.getSwapSchedule(empid, date, shift);


            return swapSchedule;
        }
        [HttpPost("login")] // Indicate a POST request
        public async Task<IActionResult> Login([FromBody] loginModelForm model) // Receive the JSON object
        {
            
            try
            {
                loginModelForm valid = await _employeeService.validate(model.username, model.password,0);

                if (valid!=null)
                {
                    Claim adminClaim;

                       Console.WriteLine(model.username + " and the role" + model.RoleID);
                    if (valid.RoleID == 0)
                        adminClaim = new Claim("role", "admin");
                    else  
                        adminClaim = new Claim("role", "employee");

                    Console.WriteLine(adminClaim);

                    Claim empIDClaim = new Claim("empID", valid.username);
                    
                    Claim audClaim = new Claim("aud", _config["JWT:ValidAudience"]);
                    Claim issuerClaim = new Claim("iss", _config["JWT:ValidIssuer"]);
                    List<Claim> claims = new List<Claim>
            {
                adminClaim,empIDClaim,audClaim,issuerClaim
            };



                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));
                    var c = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWT:Secret"])), SecurityAlgorithms.HmacSha256Signature);
                    var expiry = DateTime.Now.AddDays(1);// Set expiration time as needed


                    var token = new JwtSecurityToken(claims: claims, expires: expiry, signingCredentials: c);



                    // Return the token as a response
                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
                else
                {
                    return StatusCode(Convert.ToInt32(HttpStatusCode.Unauthorized), "failure");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during login: " + ex.Message);
                return StatusCode(500, new { status = "error" });
            }
        }



    }
}
