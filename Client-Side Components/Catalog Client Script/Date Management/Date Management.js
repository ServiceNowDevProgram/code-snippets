//Various useful ways to interact with dates on the client without needing to make a trip to the server


//Use the following to take a date / date time variable and turn it to a JS Date value
/*newValue = date(/time) variable value, i.e from an onChange script
/*getDateFromFormat = This is a ServiceNow provided function loaded into the browser
/*g_user_date_format = a variable loaded into the browser on session load that stores the users date format
*/
var date = new Date(getDateFromFormat(newValue, g_user_date_format));


//Validate a value is a date
//This is a function loaded into the browser by ServiceNow
//i.e isDate(newValue , g_user_date_format);
//Returns a Boolean

var checkDate = isDate(value , format);


//Compare two dates
//This is a function loaded into the browser by ServiceNow
//i.e compareDates("29-10-2021" , "dd-MM-yyyy" , "20-10-2021" , "dd-MM-yyyy");
//Returns -1 if either date value is not a valid date
//Returns 1 if date1 is greater than date2
//Returns 0 otherwise

var isSecondDateLarger = compareDates("29-10-2021" , "dd-MM-yyyy" , "20-10-2021" , "dd-MM-yyyy");


//Format a date value to the user session format to save in a variable/field

var date = formatDate(date,format);

/*Exampe of the above in use*/
var dateNumber = getDateFromFormat(newValue , g_user_date_format);
var date = new Date(dateNumber);
date.setDate(date.getDate() - 1);
g_form.setValue('date' , formatDate(date , g_user_date_format));
