var strConvertedDateTime=new GlideScheduleDateTime("2022-03-03 06:30:00").convertTimeZone("CET", "IST"); // Instantiate the object by passing the timezones
var gdtConvertedDateTime = new GlideDateTime(strConvertedDateTime); //Call the method to convert the date time from CET to IST
gs.info(gdtConvertedDateTime); //Print the converted value
