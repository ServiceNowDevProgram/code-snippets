var date1 = new GlideDateTime(); 
var date2 = new GlideDateTime(gs.daysAgo(-1000));

//This function can be used to find the difference between two dates and get response in different formats

function getDifferenceBtnDates(date1, date2, type){
    var dur = new GlideDuration(new GlideDateTime.subtract(date1,date2));// find difference between two dates in duration
    
    switch(type){
    case "days": return dur.getDayPart(); // get difference in days between two days
    case "ms": return dur.getNumericValue(); // get difference in milliseconds
    case "timer":  return dur.getDisplayValue(); //get difference in Days Hours Minute format
    default : return dur; //get difference in yyyy:mm:dd hh:mm:ss format
    }
}
gs.info(getDifferenceBtnDates(date1,date2, "days"));
gs.info(getDifferenceBtnDates(date1,date2, "ms"));
gs.info(getDifferenceBtnDates(date1,date2, "timer"));
gs.info(getDifferenceBtnDates(date1,date2));
