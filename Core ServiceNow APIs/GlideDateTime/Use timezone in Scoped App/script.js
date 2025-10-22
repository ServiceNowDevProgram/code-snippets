//Code show just a simple example on how to use it.
//here I have a timezone field on the record and a date field, then I want to set the start time to be 8AM on with that specific timezone on another time.
//Below code could have been done in a Before Business Rule

var appOpenDateTime = new GlideDateTime(current.application_open_date);//It's a date field

appOpenDateTime.addSeconds(28880);//28880 seconds is 8 hours, to get it to 8AM
var gsdt = new GlideScheduleDateTime(appOpenDateTime);
var timeZone = current.getValue('timezone');
gsdt.convertTimeZone(timeZone, "UTC"); //Convert it to UTC which is the value saved in the instance.

// create the date&time value and set it
var appStart = new GlideDateTime(gsdt);
current.setValue('appStart',appStart);
