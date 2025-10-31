(function executeRule(current, previous) {
    var today = new GlideDateTime();
    var dayOfWeek = today.getDayOfWeek(); // Returns 1 (Monday) to 7 (Sunday)

    // Check if it's a weekday (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
     
        var grHoliday = new GlideRecord('cmn_schedule_holiday');
        grHoliday.addQuery('date', today.getDate());
        grHoliday.query();
        if (!grHoliday.hasNext()) {
            // Trigger notification
            gs.eventQueue('<weekday>', current, '', '');
        }
    }
})(current, previous);
