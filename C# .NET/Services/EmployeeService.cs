using Staff_Scheduler_Backend.Models;
using Staff_Scheduler_Backend.Repository;
using Staff_Scheduler_Backend.Repository.Interfaces;
using Staff_Scheduler_Backend.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Staff_Scheduler_Backend.Services
{
    public class EmployeeService : IEmployeeService
    {

        private readonly IEmployee _iEmployee;
            public EmployeeService(IEmployee employee)
        {
                this._iEmployee = employee;
        }
        public List<EmployeeDetails> getEmployeeDetails()
        {
          return _iEmployee.getEmployeeDetails();
        }

       

        public EmployeeDetails getEmployeeDetailsWithID(string id)
        {
            EmployeeDetails emp= _iEmployee.getEmployeeDetailsWithID(id);
            return emp;
        }

        public List<ScheduleDetails> getScheduleDetails()
        {
            return _iEmployee.getScheduleDetails();
        }

        public List<ScheduleDetails> getScheduleDetailsWithID(string id)
        {
            return _iEmployee.getScheduleDetailsWithID(id);
        }

        public int addScheduleDetails(ScheduleDetails schedule)
        {
            return _iEmployee.addScheduleDetails( schedule);
        }

        public  string Encrypt(string txt)
        {
            byte[] key = Encoding.UTF8.GetBytes("12345678912345671234567891234567");
            byte[] iv = Encoding.UTF8.GetBytes("1234567890123456");
            using (Aes aes = Aes.Create())
            {
                aes.Key = key;
                aes.IV = iv;
                ICryptoTransform ict = aes.CreateEncryptor(aes.Key, aes.IV);
                using (MemoryStream ms = new MemoryStream())
                {

                    using (CryptoStream cs = new CryptoStream(ms, ict, CryptoStreamMode.Write))
                    {
                        using (StreamWriter sw = new StreamWriter(cs))
                        {
                            sw.Write(txt);
                        }
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }

            }

        }

        public   string Decrypt(string txt)
        {
            byte[] key = Encoding.UTF8.GetBytes("12345678912345671234567891234567");
            byte[] iv = Encoding.UTF8.GetBytes("1234567890123456");
            byte[] arr = Convert.FromBase64String(txt);
            using (Aes aes = Aes.Create())
            {

                aes.Key = key;
                aes.IV = iv;

                ICryptoTransform itct = aes.CreateDecryptor(aes.Key, aes.IV);
                using (MemoryStream ms = new MemoryStream(arr))
                {
                    using (CryptoStream cs = new CryptoStream(ms, itct, CryptoStreamMode.Read))
                    {
                        using (StreamReader sr = new StreamReader(cs))
                        {
                            return sr.ReadToEnd();
                        }
                    }


                }

            }

        }

        public string GenerateRandomString(int length)
        {
            var random = new Random();
            const string chars = "abcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public int addnewemployee(EmployeeDetails newEmployee)
        {
            return _iEmployee.addnewemployee(newEmployee);
        }

        public int updateScheduleDetails(ScheduleDetails scheduleDetails)
        {
            return _iEmployee.updateScheduleDetails( scheduleDetails); ;
        }

        public async Task<loginModelForm> validate(string username, string password, int roleID)
        {
            loginModelForm userForm = new loginModelForm();
           
            userForm = _iEmployee.getuser(username);

            if (userForm == null)
            {

                return null;
            }
          string   obtainedPassword = Decrypt(userForm.password);
             if (obtainedPassword == password )
            {
                return userForm;
            }
            return null;
        }

 

        public int deleteScheduleDetails(ScheduleDetails scheduleDetails)
        {

            return _iEmployee.deleteScheduleDetails(scheduleDetails);
        }

        public  int broadcastMessage(string message)
        {
            return _iEmployee.broadcastMessage(message);
        }

        public List<string> getAllMessages()
        {
            return _iEmployee.getAllMessages();
        }

        internal List<todaysSchedule> getTodaysSchedule(string id)
        {
            return _iEmployee.getTodaysSchedule(id);
        }

        public int createNewEmployee(EmployeeDetails newEmployeeData)
        {
            return _iEmployee.createNewEmployee( newEmployeeData);
        }

        public int createNewEmployeeCred(string empID, int role, string hashedPassword)
        {
          return _iEmployee.createNewEmployeeCred( empID,role, hashedPassword);
        }

        public List<ScheduleDetails> getSwapSchedule(string empid, string date, string shift)
        {
           return _iEmployee.getSwapSchedule(empid, date, shift);   
        }

        public  int newSwapRequest(requestForm request)
        {
            return _iEmployee.newSwapRequest(request);  
        }

        public  List<requestForm> getPendingRequests()
        {
            return _iEmployee.getPendingRequests();
        }

        public int acceptRequest(requestForm swaprequestForm)
        {
            return _iEmployee.acceptRequest(swaprequestForm);
        }

        public int rejectRequest(requestForm swaprequestForm)
        {
            return _iEmployee.rejectRequest(swaprequestForm);
        }
    }
}
