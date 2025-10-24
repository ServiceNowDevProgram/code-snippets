var CaclculateDueDate = Class.create();
CaclculateDueDate.prototype = {
    initialize: function() {},

    calculateDueDate: function(date, days_to_add) {
        var business_hour_per_day = 8; // This can be stored in the system property (Value in Hours) and reused
        var duration_script = new DurationCalculator(); // OOB Script include
        var tz = gs.getSysTimeZone(); // Get the system timezone

        duration_script.setSchedule('c798c1dfc3907e1091ea5242b40131c8', tz); // Sys id of the schedule
        duration_script.setStartDateTime(new GlideDateTime(date));
        var total_duration = days_to_add * (business_hour_per_day * 60 * 60); // Converting the days to seconds
        duration_script.calcDuration(total_duration);

        var calculated_due_date = duration_script.getEndDateTime();
        return calculated_due_date.getDisplayValue();
    },

    type: 'CaclculateDueDate'
};
