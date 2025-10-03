//Code that checks if today is not Saturday or Sunday (i.e. Weekend) and if it turns out that today is not weekend, then execute the further logic written.

var today = new GlideDateTime();
var day = today.getDayOfWeek(); //returns the day of week as number, Monday = 1, Tuesday = 2, ... Saturday = 6, Sunday = 7
if(day != 6 && day != 7){
 //Do whatever task or update you want to execute on weekdays be it triggering emails or running scheduled script
 gs.print("Today is weekday. Good to execute updates.");
}
