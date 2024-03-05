using Staff_Scheduler_Backend.Models;
namespace Staff_Scheduler_Backend.Repository.Interfaces
{
    public interface IEmployee
    {
        
        public int addScheduleDetails(ScheduleDetails schedule);
        public int addnewemployee(EmployeeDetails newEmployee);
        public List<EmployeeDetails> getEmployeeDetails();
        
        public EmployeeDetails getEmployeeDetailsWithID(string id);

        public List<ScheduleDetails> getScheduleDetails();

        public List<ScheduleDetails> getScheduleDetailsWithID(string id);

        public int updateScheduleDetails(ScheduleDetails scheduleDetails);
        public int deleteScheduleDetails(ScheduleDetails scheduleDetails);
       public  loginModelForm getuser(string username);
       public  int broadcastMessage(string message);
        public List<string> getAllMessages();
       public  List<todaysSchedule> getTodaysSchedule(string id);
        public int createNewEmployee( EmployeeDetails newEmployeeData);
        public int createNewEmployeeCred(string empID, int role,string hashedPassword);
        public List<ScheduleDetails> getSwapSchedule(string empid, string date, string shift);
      public   int newSwapRequest(requestForm request);
       public  List<requestForm> getPendingRequests();
        public int acceptRequest(requestForm swaprequestForm);
        public int rejectRequest(requestForm swaprequestForm);
    }
}
