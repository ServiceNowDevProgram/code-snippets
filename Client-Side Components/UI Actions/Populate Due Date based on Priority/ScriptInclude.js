/* 

Input
1. Created Date
2. Priority

Output
1. Due Date

Based on Priority equivalent due dates

P1 - add 4hrs to the Created date
P2 - add 4hrs to the Created date but if it's exceed the working hrs of of 5 PM the add to the next day or if the is before the working hours of 8 AM set 5 PM to the same Created date.
P3 or P4 - Kind of low priority so add the due date to the next day but it should exclude the holidays and the weekend's and the populate the next business working day.

*/


// This SI findDueDate() function will help to calculate the duration based on the each priority.

var CalculateDueDates = Class.create();
CalculateDueDates.prototype = {
    initialize: function() {},

    findDueDate: function(priority, created) {
        var dueDateVal;


		// For the Priority 1 and adding 4 hours in reagrd less of 8-5 working hours and then holidays
        if (priority == 1) {
            var now = new GlideDateTime(created);
            now.addSeconds(60 * 60 * 4); // Add 4 hours
            dueDateVal = now;
            return dueDateVal;

        } 

		// For the Priority 2 and adding the 4 hours if exceed the workin hours then add the next day before 5'o Clock
		else if (priority == 2) {
            var dueDate = new GlideDateTime(created);
            dueDate.addSeconds(60 * 60 * 4); // Add 4 hours
            dueDate = dueDate+'';
            var hours = Number((dueDate + '').slice(11, 13));
        
            if (hours >= 0 && hours < 12) {
                gs.addInfoMessage('if Inside 8-5/7');
                dueDateVal = dueDate.slice(0, 10) + " 17:00:00";
                return dueDateVal;

            } else if (hours >= 17 && hours <= 23) {
                var nextDate = new GlideDateTime(created);
                nextDate.addDaysUTC(1);
                var newDue = new GlideDateTime(nextDate.getDate().getValue() + " 17:00:00");
                dueDateVal = newDue;
                return dueDateVal;
            } else {
                dueDateVal = dueDate;
                return dueDateVal;
            }

        } 
		
		// For the Priority 3 or 4 add the next day and then if the due date is holiday or weekend populate the next working day in a respective field
		else if (priority == 3 || priority == 4) {
            var schedule = new GlideSchedule();
			// cmn_schedule for the Holidays
            var scheduleId = 'bd6d74b2c3fc72104f7371edd40131b7';
            schedule.load(scheduleId);

            var nextDay = new GlideDateTime(created);
            nextDay.addDaysUTC(1);


            //Checking for weekends
            var dayOfWeek = nextDay.getDayOfWeekUTC();

            var isWeekend = (dayOfWeek == 6 || dayOfWeek == 7);


            // Loop until next working day (weekdays excluding holidays)
            while (schedule.isInSchedule(nextDay) || isWeekend) {
                nextDay.addDaysUTC(1);
                dayOfWeek = nextDay.getDayOfWeekUTC();
                isWeekend = (dayOfWeek == 6 || dayOfWeek == 7);
            }

            // Set to 12:00 PM on that valid day
            var validDate = new GlideDateTime(nextDay.getDate().getValue() + " 17:00:00");
            return validDate;
        }
    },

    type: 'CalculateDueDates'
};