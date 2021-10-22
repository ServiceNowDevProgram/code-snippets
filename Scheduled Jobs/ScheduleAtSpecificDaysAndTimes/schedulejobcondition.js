/*************************************************************************************/
// INPUT ARGUMENTS
// days - Create a system property "job.days.execute" and specify the number of days as comma separated values eg 1,3,5 
// 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday and 7 - Sunday

// hours - Create a system property "job.hours.execute" and specify the time as comma separated values eg 6,12,18,24
// 1-1am, 12-12pm, 18-6pm and 24-12am 

// OUTPUT ARGUMENTS
// execute - Returns true or false and determines whether the job should be executed or not
/*************************************************************************************/

executeJob();

function executeJob() {
    var execute = false;
    var days = gs.getProperty('job.days.execute');
    var hours = gs.getProperty('job.hours.execute');

    var dateTime = new GlideDateTime();
    var dayOfWeek = dateTime.getDayOfWeekLocalTime();
    var timeOfDay = dateTime.getLocalTime().toString().split(" ")[1];
    var hourOfDay = parseInt(timeOfDay.split(":")[0]);

    if (days.indexOf(dayOfWeek) > -1 && hours.indexOf(hourOfDay) > -1) {
        execute = true;
    }

    return execute;
}
