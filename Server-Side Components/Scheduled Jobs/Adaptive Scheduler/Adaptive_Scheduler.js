/*Adaptive-Scheduler
--------------------------------------------------------------
- This script is intended to be added to the *Condition* field
  of a Scheduled Report.
- Ensure the *"Advanced"* option checkbox is checked.
- Purpose:
    * Run quarterly reports on the 2nd day of the quarter.
    * If the 2nd day falls on a Friday, Saturday, or Sunday,
      the report will instead run on the 5th day.
- Benefits:
    * Ensures consistent quarterly reporting.
    * Eliminates manual rescheduling for weekend conflicts.
    * Maintains timely delivery of business insights.
    -------------------------------------------------------------------------
- Scheduled Report configuration
    * Run: Monthly
    * Day: 5
    -------------------------------------------------------------------------
*/




var start = false;                                                                                   //flag is declared
var gdt = new GlideDateTime();                                                                      // Create a GlideDateTime object for date calculations
gdt.addDays(-3);                                                                                   // Move back 3 days to simulate checking the 2nd day’s conditions
var dayOfWeek = gdt.getDayOfWeek();                                                               // Get the day of the week (1 = Monday, 7 = Sunday)
var currentMonth = gdt.getMonthLocalTime();

if (((currentMonth % 3) == 2) && (dayOfWeek == '5' || dayOfWeek == '6' || dayOfWeek == '7')) {    // Check if this is a quarterly month (February, May, August, November)
                                                                                                  // if the 2nd day falls on a Friday (5), Saturday (6), or Sunday (7)
    start = true;                                                                                 // Run on 5th if 2nd is Friday/weekend
}
start;
