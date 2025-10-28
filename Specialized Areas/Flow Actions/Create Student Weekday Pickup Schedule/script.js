(function execute(inputs, outputs) {
  // Define the start time as 8:00 am and the end times as 3:00 pm and 2:00 pm for regular and early release days, respectively
  var startTime = inputs.StartTime;
  var endTimeRegular = inputs.RegularEndTime;
  var endTimeEarlyRelease = inputs.EarlyReleaseEndTime;
  var student = inputs.Student;
  var pickupLocation = inputs.PickupLocation;
  var parent = inputs.ContractRecord
  var destination = inputs.Destination

  // Define an array of the weekdays from Monday to Friday
  var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	
  // Create a Date object for the current date and get the day of the week as a number (0 = Sunday, 1 = Monday, etc.)
  var currentDate = new GlideDateTime();
  var currentDayOfWeek = currentDate.getDayOfWeekLocalTime();
	
  // Calculate the date for Monday of the current week by subtracting the current day of the week from the current date and adding 1
  var mondayDate = new GlideDateTime(currentDate);
  mondayDate.setDisplayValue(currentDate.getLocalDate() - currentDayOfWeek + 1);
	dayStart = mondayDate;
    scheduledPickup = mondayDate.getLocalDate();
  // Loop through the weekdays array and create a new GlideRecord for each weekday with the start and end times set to the specified values
  weekdays.forEach(function(day, index) {
    // Calculate the date for the current day by adding the index to the Monday date
    var currentDate = new GlideDateTime(mondayDate);
    
    var scheduledDate = new GlideDateTime(mondayDate);
    currentDate.setDisplayValue(mondayDate.getLocalDate() + index);
     var theDay= (scheduledDate.getLocalDate() + ' 08:00:00');
     scheduledDate.setValue(theDay);
     var serviceDate = currentDate.getLocalDate()
    gs.info("**** Current Date: " + currentDate);
    
    // Determine the end time based on whether it's an early release day or not
    var endTime;
    if (day === 'Wednesday') {
      endTime = endTimeEarlyRelease;
    } else {
      endTime = endTimeRegular;
    }
    
    
    
    // Create a new GlideRecord for the current weekday and set the fields
    var newRecord = new GlideRecord('x_407566_adventu_0_transportation');
    newRecord.initialize();
    newRecord.setValue('active', true);
    newRecord.setValue('school_start_time', startTime);
    newRecord.setValue('school_end_time', endTime);
    newRecord.setValue('weekday', day);
    newRecord.setValue('student', student);
    newRecord.setValue('state', 'scheduled');
    newRecord.setValue('type', 'to_school');
    newRecord.setValue('pickup_location', pickupLocation);
   newRecord.setValue('drop_off_location', destination);
    newRecord.setValue('notes', "Auto Generated Schedule 2023");
   newRecord.setValue('scheduled_pickup', serviceDate);
    newRecord.setValue('parent', parent);
    newRecord.insert();
  });

  outputs.weekdays = serviceDate;
  outputs.schedule = scheduledDate;
})(inputs, outputs);
