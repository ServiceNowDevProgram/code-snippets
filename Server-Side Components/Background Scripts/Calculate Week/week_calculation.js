//Determines the number of weeks between the start and end dates
var startDate = new GlideDateTime(<start_date>);
var endDate = new GlideDateTime(<end_date>);

var millisecondsBetween = endDate.getNumericValue() - startDate.getNumericValue();
var weeks = millisecondsBetween / (1000 * 60 * 60 * 24 * 7);

var weeks_roundoff =  Math.floor(weeks);

gs.info(weeks_roundoff);
