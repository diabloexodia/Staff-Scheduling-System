namespace Staff_Scheduler_Backend.Models
{
    public class requestForm
    {
        public string empID { get; set; }
        public string name { get; set; }
        public string shifterempid { get; set; }    
        public string shift {  get; set; }  
        public DateOnly date {  get; set; } 
    }
}
