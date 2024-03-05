using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Staff_Scheduler_Backend.Models;
using Staff_Scheduler_Backend.Services;
using Staff_Scheduler_Backend.Services.Interfaces;
using System.Text;
namespace Staff_Scheduler_Backend.Controllers
{
    public class ScheduleController : Controller
    {
        private readonly EmployeeService _employeeService;

        public ScheduleController(EmployeeService employeeService)
        {

            _employeeService = employeeService;
        }

        [Authorize(Roles = "employee,admin")]
        [HttpGet]
        [Route("/schedules")]
        public ActionResult<List<ScheduleDetails>> GetScheduleDetails()
        {
            List<ScheduleDetails> scheduleList = _employeeService.getScheduleDetails();

            return Ok(scheduleList);
        }

        [Authorize(Roles = "employee,admin")]
        [HttpGet("/schedules/{id}")]
        public ActionResult<List<ScheduleDetails>> GetScheduleDetailsById(string id)
        {
            List<ScheduleDetails> scheduleList = _employeeService.getScheduleDetailsWithID(id);

            if (scheduleList == null)
            {
                return NotFound();
            }

            return Ok(scheduleList);
        }


        [HttpPost]
        [Route("/newSchedule")]
        public ActionResult<string> CreateSchedule([FromBody] ScheduleDetails schedule)
        {
            //Implement code to add the schedule details to the schedule_master table
            //Example code to add the details using the service
       
            if (1 == _employeeService.addScheduleDetails(schedule))
                return Ok();
            else
                return BadRequest();

        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("/updateSchedule")]
        public ActionResult<string> UpdateSchedule([FromBody] ScheduleDetails scheduleDetails)
        {
            try
            {
                // Call the updateScheduleDetails method to update the details
                int rowsUpdated = _employeeService.updateScheduleDetails(scheduleDetails);

                if (rowsUpdated > 0)
                {
                    return Ok("Schedule details updated successfully.");
                }
                else
                {
                    return NotFound("No matching schedule details found to update.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "admin")]
        [HttpPost("/schedules/deleteSchedule")]

        public ActionResult<string> deleteSchedule([FromBody] ScheduleDetails scheduleDetails)
        {
           try {
                // Call the updateScheduleDetails method to update the details
                int rowsUpdated = _employeeService.deleteScheduleDetails(scheduleDetails);

                if (rowsUpdated > 0)
                {
                    return Ok("Schedule details deleted successfully.");
                }
                else
                {
                    return NotFound("No matching schedule details found to delete.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

        }




        [Authorize(Roles = "employee")]
        [HttpPost]
        [Route("requestSwap")]
        public IActionResult requestSwap([FromBody] requestForm request)
        {
           

            if (1 == _employeeService.newSwapRequest(request))
            {
                return Ok(new { message = "Request Sent " });
            }
            return Ok(new { message = "unknown error" });
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("acceptSwap")]
        public IActionResult acceptSwap([FromBody] requestForm swaprequestForm)
        {

            if ( _employeeService.acceptRequest(swaprequestForm)>=2)
            {
                return Ok(new { message = "Swap Accepted" });
            }
            return Ok(new { message = "unknown error" });
        }

        //acceptSwap

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("rejectSwap")]
        public IActionResult rejectSwap([FromBody] requestForm swaprequestForm)
        {

            if (_employeeService.rejectRequest(swaprequestForm) == 1)
            {
                return Ok(new { message = "Swap Rejected" });
            }
            return Ok(new { message = "unknown error" });
        }

    }
}