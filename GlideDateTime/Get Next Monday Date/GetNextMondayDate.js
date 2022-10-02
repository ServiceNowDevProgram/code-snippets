function GetNextMonday() {
    var date = new GlideDateTime();
    var today = new GlideDate().getDayOfMonthNoTZ(); //Day number of the month
    var dayInWeek = date.getDayOfWeek();
    
    var nextMonday = (today - dayInWeek + 8); //8 for Monday of Next week. 
    date.addDaysLocalTime(nextMonday); // interger of days until next monday
    
    return date.getDate();

}
GetNextMonday()
