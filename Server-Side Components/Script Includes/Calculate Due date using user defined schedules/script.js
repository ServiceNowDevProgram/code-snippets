var CaclculateDueDate = Class.create();
CaclculateDueDate.prototype = {
    initialize: function() {},

    calculateDueDate: function(date, days_to_add) {
        var checkDate = new GlideDateTime(date);
        var daysToAdd = days_to_add;


        while (daysToAdd > 0) {
            var sched = new GlideSchedule('c798c1dfc3907e1091ea5242b40131c8'); // Schedule record SYS_ID. Currently 9-5 Weekdays and Indian Public Holiday(excluded) schedule has been used
            checkDate.addDaysLocalTime(1);
            if (sched.isInSchedule(checkDate)) {
                daysToAdd--;

            } else {
                continue;

            }
        }

        return checkDate.getValue();
    },

    type: 'CaclculateDueDate'
};
