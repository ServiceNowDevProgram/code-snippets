(function executeRule(current, previous /*null when async*/ ) {

 
    var notdt = new GlideDateTime();
	
// Setting next notification date (NND) to 14 days from record create date or any other state that your record begins with
	//change state value per your needs

        if (current.state == 602) {                                             
            notdt.addDaysLocalTime(14);
            current.next_notification_date = notdt.getLocalDate();
        } else if (current.state == 603 || current.state == 18) {               // In Progress, Awaiting Info  or any other state
            /* Setting the first "Next Notification Date" (NND) to 3 weekdays from current day
               If adding 3 days makes it a Sat we need to add two more days so that the NND is a Monday. 
	       If adding 3 days makes it a Sat then add two more days so that the NND is a Monday. 
	       If adding 3 days makes it a Sun then add 1 more day so that the NND is a Monday */
            notdt.addDaysLocalTime(3);
            if (notdt.getDayOfWeekLocalTime() == 6) {
                notdt.addDaysLocalTime(2);
                current.next_notification_date = notdt.getLocalDate();
            } else {
                if (notdt.getDayOfWeekLocalTime() == 7) {
                    notdt.addDaysLocalTime(1);
                    current.next_notification_date = notdt.getLocalDate();
                } else {
                    current.next_notification_date = notdt.getLocalDate();
                }
            }
        }
    
})(current, previous);
