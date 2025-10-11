function getNextMonday() {
    var today = new GlideDate().getDayOfMonthNoTZ();
    var dayOfWeek = new GlideDateTime().getDayOfWeek();

    var daysUntilNextMonday = 8 - dayOfWeek; // 8 for Monday of next week
    var nextMondayDate = new GlideDate();
    nextMondayDate.addDaysLocalTime(daysUntilNextMonday);

    gs.info("The next upcoming Monday is on " + nextMondayDate.getDate() + ", in " + daysUntilNextMonday + " days.");
    
    return nextMondayDate.getDate();
}

getNextMonday();

