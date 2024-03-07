using Staff_Scheduler_Backend.Models;
using Staff_Scheduler_Backend.Repository.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.NetworkInformation;
using System.Data.SqlClient;
using System.Globalization;
namespace Staff_Scheduler_Backend.Repository
{


    public class Employee : IEmployee
    {
        public string cstr = "";
        public Employee()
        {
            cstr = @"Data Source=APINP-ELPTOH9CG\SQLEXPRESS;Initial Catalog=staffschedule;User ID=tap2023;Password=tap2023;Encrypt=False";
        }


        public int acceptRequest(requestForm swaprequestForm)
        {
            int totalUpdatedRows = 0;
            int totalDeletedRows = 0;

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                // Step 1: Retrieve the shiftername for the corresponding shifterempid
                string query = "SELECT shiftername FROM pending_requests WHERE shifterempid = @ShifterEmpId";
                using (SqlCommand command = new SqlCommand(query, connection))
                {


                    command.Parameters.AddWithValue("@ShifterEmpId", swaprequestForm.shifterempid);

                    string temporaryName = (string)command.ExecuteScalar();

                    // Step 2: Update the schedule_master table
                    query = "UPDATE schedule_master SET empid = @EmpId, name = @Name WHERE date = @Date AND shift = @Shift";
                    using (SqlCommand updateCommand = new SqlCommand(query, connection))
                    {
                        updateCommand.Parameters.AddWithValue("@EmpId", swaprequestForm.empID);
                        updateCommand.Parameters.AddWithValue("@Name", temporaryName);
                        updateCommand.Parameters.AddWithValue("@Date", swaprequestForm.date.ToString());
                        updateCommand.Parameters.AddWithValue("@Shift", swaprequestForm.shift);

                        totalUpdatedRows = updateCommand.ExecuteNonQuery();
                    }
                }

                // Step 3: Delete the record with swaperempid from schedule_master table
                query = "DELETE FROM schedule_master WHERE empid = @SwapEmpId AND date = @Date AND shift = @Shift";
                using (SqlCommand deleteCommand = new SqlCommand(query, connection))
                {
                    deleteCommand.Parameters.AddWithValue("@SwapEmpId", swaprequestForm.shifterempid);
                    deleteCommand.Parameters.AddWithValue("@Date", swaprequestForm.date.ToString());
                    deleteCommand.Parameters.AddWithValue("@Shift", swaprequestForm.shift);

                    totalDeletedRows = deleteCommand.ExecuteNonQuery();
                }

                // Step 4: Delete the record from pending_schedules
                query = "DELETE FROM pending_requests WHERE empid = @EmpId AND date = @Date AND shift = @Shift";
                using (SqlCommand deletePendingSchedulesCommand = new SqlCommand(query, connection))
                {
                    deletePendingSchedulesCommand.Parameters.AddWithValue("@EmpId", swaprequestForm.empID);
                    deletePendingSchedulesCommand.Parameters.AddWithValue("@Date", swaprequestForm.date.ToString());
                    deletePendingSchedulesCommand.Parameters.AddWithValue("@Shift", swaprequestForm.shift);

                    int totalDeletedPendingSchedulesRows = deletePendingSchedulesCommand.ExecuteNonQuery();

                    // Optionally, you can log or return the total number of deleted rows from pending_schedules
                    // For example: Console.WriteLine($"Total rows deleted from pending_schedules: {totalDeletedPendingSchedulesRows}");
                }
            }

            // Return the total number of updated and deleted rows
            return totalUpdatedRows + totalDeletedRows;
        }

        public int addnewemployee(EmployeeDetails newEmployee)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "INSERT INTO employee_master (EmpID, Name, Role, Email, Phone) " +
                               "VALUES (@EmpID, @Name, @Role, @Email, @Phone)";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@EmpID", newEmployee.EmpID);
                    command.Parameters.AddWithValue("@Name", newEmployee.Name);
                    command.Parameters.AddWithValue("@Role", newEmployee.Role);
                    command.Parameters.AddWithValue("@Email", newEmployee.Email);
                    command.Parameters.AddWithValue("@Phone", newEmployee.Phone);

                    connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    connection.Close();

                    return rowsAffected;
                }
            }
        }


        public int addScheduleDetails(ScheduleDetails schedule)
        {
            // Validate the schedule object (optional)
            if (schedule == null)
            {
                return 0;
            }

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "INSERT INTO schedule_master (EmpID, [Name], Job_Role, [Shift], Location, [Date], Start_Time, End_Time) " +
                               "VALUES (@EmpID, @Name, @Job_Role, @Shift, @Location, @Date, @Start_Time, @End_Time)";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@EmpID", schedule.EmpID);
                    command.Parameters.AddWithValue("@Name", schedule.Name);
                    command.Parameters.AddWithValue("@Job_Role", schedule.Job_Role);
                    command.Parameters.AddWithValue("@Shift", schedule.Shift);
                    command.Parameters.AddWithValue("@Location", schedule.Location);
                    command.Parameters.AddWithValue("@Date", schedule.Date.ToString("yyyy-MM-dd"));
                    command.Parameters.AddWithValue("@Start_Time", schedule.Start_Time);
                    command.Parameters.AddWithValue("@End_Time", schedule.End_Time);

                    connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    connection.Close();

                    return rowsAffected;
                }
            }
        }


        public int broadcastMessage(string message)
        {
            string sql = "INSERT INTO broadcastMessages(Message) VALUES (@Message);";

            using (SqlConnection conn = new SqlConnection(cstr))
            {
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@Message", message);
                    try
                    {
                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        return rowsAffected; // Return the number of rows affected by the INSERT operation
                    }
                    catch (SqlException ex)
                    {
                        // Handle exception (e.g., log error message)
                        Console.WriteLine("Insert Error: " + ex.Message);
                        return -1; // Return an error code or throw an exception
                    }
                }
            }
        }

        public int createNewEmployee(EmployeeDetails newEmployeeData)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                string sqlQuery = "INSERT INTO employee_master (EmpID, Name, Role, Email, Phone) VALUES (@EmpID, @Name, @Role, @Email, @Phone);";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@EmpID", newEmployeeData.EmpID);
                    command.Parameters.AddWithValue("@Name", newEmployeeData.Name);
                    command.Parameters.AddWithValue("@Role", newEmployeeData.Role);
                    command.Parameters.AddWithValue("@Email", newEmployeeData.Email);
                    command.Parameters.AddWithValue("@Phone", newEmployeeData.Phone);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected;
                }
            }
        }

        public int createNewEmployeeCred(string empID, int role, string hashedPassword)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                string sqlQuery = "INSERT INTO login_cred (EmpID, password, RoleID) VALUES (@EmpID, @password, @Role);";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@EmpID", empID);
                    command.Parameters.AddWithValue("@password", hashedPassword);
                    command.Parameters.AddWithValue("@Role", role);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected;
                }
            }
        }

        public int deleteScheduleDetails(ScheduleDetails scheduleDetails)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                string query = "DELETE FROM schedule_master WHERE EmpID = @EmpID AND Date = @Date AND Shift = @Shift";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@EmpID", scheduleDetails.EmpID);
                    command.Parameters.AddWithValue("@Date", scheduleDetails.Date.ToString());
                    command.Parameters.AddWithValue("@Shift", scheduleDetails.Shift);

                    int rowsUpdated = command.ExecuteNonQuery();

                    return rowsUpdated;
                }
            }
        }


        public List<string> getAllMessages()
        {
            List<string> messages = new List<string>();
            // Replace with your actual connection string

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("SELECT Message FROM broadcastMessages", connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            messages.Add(reader.GetString(0)); // Assuming 'Message' is the first column in your query
                        }
                    }
                }
            }

            return messages;
        }
    
        

        public List<EmployeeDetails> getEmployeeDetails()
        {
            List<EmployeeDetails> employeeList = new List<EmployeeDetails>();


            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT * FROM employee_master";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        EmployeeDetails employee = new EmployeeDetails();

                        employee.EmpID = reader["EmpID"].ToString();
                        employee.Name = reader["Name"].ToString();
                        employee.Role = Convert.ToInt32(reader["Role"]);
                        employee.Email = reader["Email"].ToString();
                        employee.Phone = reader["Phone"].ToString();

                        employeeList.Add(employee);
                    }

                    reader.Close();
                }

                connection.Close();
            }

            return employeeList;
        }

        public EmployeeDetails getEmployeeDetailsWithID(string id)
        {
            EmployeeDetails employee = new EmployeeDetails();
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT * FROM employee_master WHERE EmpID = @id";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        

                        employee.EmpID = reader["EmpID"].ToString();
                        employee.Name = reader["Name"].ToString();
                        employee.Role = Convert.ToInt32(reader["Role"]);
                        employee.Email = reader["Email"].ToString();
                        employee.Phone = reader["Phone"].ToString();

                        reader.Close();
                        connection.Close();

                        return employee;
                    }

                    reader.Close();
                    connection.Close();
                }
            }

            return null; // If no employee with the specified EmpID is found
        }

        public List<requestForm> getPendingRequests()
        {
            List<requestForm> pendingRequests = new List<requestForm>();

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();
                string query = "SELECT empID, name, shifterempid, shift, date FROM pending_requests";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            requestForm request = new requestForm
                            {
                               empID = reader["empID"].ToString(),
                            name = reader["name"].ToString(),
                            shifterempid = reader["shifterempid"].ToString(),
                                shift = reader["shift"].ToString(),
                                date = DateOnly.Parse(reader["date"].ToString().Split(' ')[0])
                                // Assuming DateOnly is a custom type you've defined
                            };

                            pendingRequests.Add(request);
                        }
                    }
                }
            }

            return pendingRequests;
        }

        public List<ScheduleDetails> getScheduleDetails()
        {
            List<ScheduleDetails> scheduleList = new List<ScheduleDetails>();


            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT * FROM schedule_master";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ScheduleDetails schedule = new ScheduleDetails();

                        schedule.EmpID = reader["EmpID"].ToString();
                        schedule.Name = reader["Name"].ToString();
                        schedule.Job_Role = reader["Job_Role"].ToString();
                        schedule.Shift = reader["Shift"].ToString();
                        schedule.Location = reader["Location"].ToString();
                        schedule.Date = DateOnly.FromDateTime((DateTime)reader["Date"]);
                        schedule.Start_Time = (reader["Start_Time"].ToString());
                        schedule.End_Time = reader["End_Time"].ToString();

                        scheduleList.Add(schedule);
                    }

                    reader.Close();
                }

                connection.Close();
            }

            return scheduleList;
        }

        public List<ScheduleDetails> getScheduleDetailsWithID(string id)
        {
            List<ScheduleDetails> scheduleList = new List<ScheduleDetails>();


            using (SqlConnection connection = new SqlConnection(cstr))
            {
                string query = "SELECT * FROM schedule_master WHERE EmpID = @id";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        ScheduleDetails schedule = new ScheduleDetails();


                        schedule.EmpID = reader["EmpID"].ToString();
                        schedule.Name = reader["Name"].ToString();
                        schedule.Job_Role = reader["Job_Role"].ToString();
                        schedule.Shift = reader["Shift"].ToString();
                        schedule.Location = reader["Location"].ToString();
                        schedule.Date = DateOnly.FromDateTime((DateTime)reader["Date"]);
                        schedule.Start_Time = reader["Start_Time"].ToString();
                        schedule.End_Time = (reader["End_Time"].ToString());

                        scheduleList.Add(schedule);
                    }

                    reader.Close();
                }

                connection.Close();
            }

            return scheduleList;
        }

        public List<ScheduleDetails> getSwapSchedule(string empid, string date, string shift)
        {
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                string sqlQuery = "SELECT * FROM schedule_master WHERE date = @date AND shift = @shift AND empid != @empid";

                SqlCommand command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@date", date);
                command.Parameters.AddWithValue("@shift", shift);
                command.Parameters.AddWithValue("@empid", empid);

                List<ScheduleDetails> schedules = new List<ScheduleDetails>();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        ScheduleDetails schedule = new ScheduleDetails();
                        // Set the properties of the `schedule` object based on the columns returned in the query
                        schedule.EmpID = reader["EmpID"].ToString();
                        schedule.Name = reader["Name"].ToString();
                        schedule.Job_Role = reader["Job_Role"].ToString();
                        schedule.Shift = reader["Shift"].ToString();
                        schedule.Location = reader["Location"].ToString();
                        schedule.Date = DateOnly.FromDateTime((DateTime)reader["Date"]);
                        schedule.Start_Time = reader["Start_Time"].ToString();
                        schedule.End_Time = (reader["End_Time"].ToString());

                        // Add the `schedule` object to the `schedules` list
                        schedules.Add(schedule);
                    }
                }

                return schedules;
            }
        }

        public List<todaysSchedule> getTodaysSchedule(string id)
        {
            List<todaysSchedule> todaysSchedule = new List<todaysSchedule>();

            // Replace the connection string with your own
      //      string connectionString = "YourConnectionString";

            try
            {
                using (SqlConnection connection = new SqlConnection(cstr))
                {
                    connection.Open();

                    // Construct the SQL query
                    string query = "SELECT date, shift FROM schedule_master WHERE EmpID = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                todaysSchedule schedule = new todaysSchedule();
                                schedule.date = reader["date"].ToString();
                                schedule.shift = reader["shift"].ToString();
                                todaysSchedule.Add(schedule);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception appropriately (e.g. logging, displaying error message)
                Console.WriteLine(ex.Message);
            }

            return todaysSchedule;
        }

        public loginModelForm getuser(string username)
        {

            
            using (SqlConnection connection = new SqlConnection(cstr))
            {
                loginModelForm user = new loginModelForm();
                try
                {
                    connection.Open();

                    // Create SQL command to retrieve user details
                    string sql = "SELECT EmpID, password, RoleID FROM login_cred WHERE EmpID = @username";

                    // Use parameterized query to prevent SQL injection
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@username", username);

                        // Execute the query and retrieve results
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                // Create loginModel object and assign values

                                user.username = reader["EmpID"].ToString();
                                user.password = reader["password"].ToString();
                                user.RoleID = int.Parse(reader["RoleID"].ToString());

                            }
                            else
                            {
                                  return null;
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    // Handle database errors gracefully
                    Console.WriteLine("Error connecting to database: " + ex.Message);
                    throw;  // Rethrow the exception to allow for further handling
                }
                return user;
            }
        }

        public int newSwapRequest(requestForm request)
        {

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                // Step 1: Retrieve the name of the employee
                string query = "SELECT name FROM employee_master WHERE empID = @empID";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@empID", request.empID);
                    string shiftername = (string)command.ExecuteScalar();

                    // Step 2: Insert the details into the pending_requests table
                    query = "INSERT INTO pending_requests (empID, name, shifterempid, shiftername, date, shift) VALUES (@empID, @name, @shifterempid, @shiftername, @date, @shift)";
                    using (SqlCommand insertCommand = new SqlCommand(query, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@empID", request.empID);
                        insertCommand.Parameters.AddWithValue("@name", request.name);
                        insertCommand.Parameters.AddWithValue("@shifterempid", request.shifterempid);
                        insertCommand.Parameters.AddWithValue("@shiftername", shiftername);
                        insertCommand.Parameters.AddWithValue("@date", request.date.ToString());
                        insertCommand.Parameters.AddWithValue("@shift", request.shift);

                        int rowsAffected = insertCommand.ExecuteNonQuery();
                        return rowsAffected;
                    }
                }
            }

        }

        public int rejectRequest(requestForm swaprequestForm)
        {
          //  string connectionString = "YourConnectionStringHere"; // Replace with your actual connection string
            string sqlCommandText = "DELETE FROM pending_requests WHERE EmpId = @EmpId AND Date = @Date AND Shift = @Shift AND ShifterEmpId = @ShifterEmpId";

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sqlCommandText, connection))
                {
                    // Set the parameters
                    command.Parameters.AddWithValue("@EmpId", swaprequestForm.empID);
                    command.Parameters.AddWithValue("@Date", swaprequestForm.date.ToString());
                    command.Parameters.AddWithValue("@Shift", swaprequestForm.shift);
                    command.Parameters.AddWithValue("@ShifterEmpId", swaprequestForm.shifterempid);

                    // Execute the command
                    int rowsAffected = command.ExecuteNonQuery();

                    // Return the number of rows affected
                    return rowsAffected;
                }
            }
        }

        public int updateScheduleDetails(ScheduleDetails scheduleDetails)
        {
            // SQL query to update the schedule details
            string updateQuery = "UPDATE schedule_master SET Name = @Name, Job_Role = @JobRole, Location = @Location, Start_Time = @StartTime, End_Time = @EndTime,EmpID = @EmpID,  Date = @Date, Shift = @Shift WHERE EmpID = @EmpID AND Date = @Date AND Shift = @Shift";

            using (SqlConnection connection = new SqlConnection(cstr))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(updateQuery, connection))
                {
                    // Set the parameter values for the SQL query
                    command.Parameters.AddWithValue("@Name", scheduleDetails.Name);
                    command.Parameters.AddWithValue("@JobRole", scheduleDetails.Job_Role);
                    command.Parameters.AddWithValue("@Location", scheduleDetails.Location);
                    command.Parameters.AddWithValue("@StartTime", scheduleDetails.Start_Time);
                    command.Parameters.AddWithValue("@EndTime", scheduleDetails.End_Time);
                    command.Parameters.AddWithValue("@EmpID", scheduleDetails.EmpID);
                    command.Parameters.AddWithValue("@Date", scheduleDetails.Date.ToString());
                    command.Parameters.AddWithValue("@Shift", scheduleDetails.Shift);

                    // Execute the update query
                    int rowsUpdated = command.ExecuteNonQuery();

                    return rowsUpdated;
                }
            }
        }

        
    }
}
