namespace Staff_Scheduler_Backend.Models
{
    public class ScheduleDetails
    {
        public string EmpID { get; set; }
        public string Name { get; set; }
        public string Job_Role { get; set; }
        public string Shift { get; set; }
        public string Location { get; set; }
        public DateOnly Date { get; set; }
        public String Start_Time { get; set; }
        public String End_Time { get; set; }
    }
}
