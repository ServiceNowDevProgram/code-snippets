var dateTime= new GlideDateTime();
var dc= new DurationCalculator(); 
dc.setStartDateTime(dateTime);
//dc.setSchedule('08fcd0830a0a0b2600079f56b1adb9ae'); 
dc.calcDuration(30*24*3600); // Provide duration for the priority here, here I have provided T6 priority duration which is 30 days.
return dc.getEndDateTime();
