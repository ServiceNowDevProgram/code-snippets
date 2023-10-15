(function executeRule(current, previous /*, display*/) {
  // Define working hours for different assignment groups
  var workingHours = {
    'IT Support': { start: 9, end: 17 },
    'Network Support': { start: 8, end: 16 },
    // Define working hours for other assignment groups
  };

  // Calculate the working hours for the current assignment group
  var assignmentGroup = current.assignment_group.getDisplayValue();
  var hours = workingHours[assignmentGroup];

  if (hours) {
    // Calculate the due date based on priority (in hours)
    var priority = current.priority;
    var dueInHours = 0;

    if (priority == 1) { // Highest priority
      dueInHours = 2;
    } else if (priority == 2) { // Medium priority
      dueInHours = 8;
    } else { // Lower priority
      dueInHours = 24;
    }

    // Calculate the due date
    var currentDateTime = new GlideDateTime();
    var dueDateTime = new GlideDateTime(currentDateTime);
    dueDateTime.add(dueInHours * 60 * 60); // Convert hours to seconds
    var dueTime = dueDateTime.getLocalTime();

    // Check if the calculated due date is within working hours
    var dueHour = dueTime.getHours();
    if (dueHour < hours.start) {
      dueTime.setHours(hours.start);
      dueTime.setMinutes(0);
      dueTime.setSeconds(0);
    } else if (dueHour >= hours.end) {
      dueTime.setHours(hours.end - 1);
      dueTime.setMinutes(59);
      dueTime.setSeconds(59);
    }

    // Set the calculated due date in the incident record
    current.due_date = dueTime;
  }
})(current, previous);
