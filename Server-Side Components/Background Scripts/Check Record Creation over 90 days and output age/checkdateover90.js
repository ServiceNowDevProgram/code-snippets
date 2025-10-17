//the pastDateString variable can contain a date-time which you received by querying any particular record's sys_created_on field or any other relevant field. Here I'm hard-coding a value.

var pastDateString = '2025-05-01 10:00:00'; //input date and time
var ageThresholdDays = 90;

var gdtPast = new GlideDateTime(pastDateString);
var gdtNow = new GlideDateTime();
var duration = GlideDateTime.subtract(gdtPast, gdtNow);
var durationMs = duration.getNumericValue();

//Calculate the total days (1 day = 86,400,000 milliseconds)
var totalDaysOld = Math.floor(durationMs / 86400000);

var isOlderThanThreshold = false;
if (totalDaysOld > ageThresholdDays) {
    isOlderThanThreshold = true;
}

gs.info("Record Age (Days): " + totalDaysOld);
gs.info("Older than " + ageThresholdDays + " days? " + isOlderThanThreshold);
