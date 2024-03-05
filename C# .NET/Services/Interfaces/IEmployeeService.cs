using Staff_Scheduler_Backend.Models;

namespace Staff_Scheduler_Backend.Services.Interfaces
{
    public interface IEmployeeService
    {

        public Task<loginModelForm> validate(string username, string password, int RoleID);
        public List<EmployeeDetails> getEmployeeDetails();
        public int addScheduleDetails(ScheduleDetails schedule);
        public int addnewemployee(EmployeeDetails newEmployee);
        public int updateScheduleDetails(ScheduleDetails scheduleDetails);
        public int deleteScheduleDetails(ScheduleDetails scheduleDetails);
        public List<string> getAllMessages();
        public  string Encrypt(string txt);
        public  string Decrypt(string txt);
        public string GenerateRandomString(int length);
        public EmployeeDetails getEmployeeDetailsWithID(string id);

        public List<ScheduleDetails> getScheduleDetails();

        public List<ScheduleDetails> getScheduleDetailsWithID(string id);

        public int createNewEmployeeCred(string empID, int role, string hashedPassword);
        public int createNewEmployee(EmployeeDetails newEmployeeData);
        public List<requestForm> getPendingRequests();
    }
}
