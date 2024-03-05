export interface scheduleDetails {
    schedule :[EmpID: string,
    Name: string,
    Job_Role: string,
    Shift: string,
    Location: string,
    Date: string, // Assuming DateOnly is translated to Date for Angular
    Start_Time: string,
    End_Time: string,]
}