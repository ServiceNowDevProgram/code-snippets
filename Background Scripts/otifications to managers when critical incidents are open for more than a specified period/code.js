(function() {
  // Define the incident table
  var incidentGR = new GlideRecord('incident');
  incidentGR.addQuery('active', true);
  incidentGR.addQuery('priority', 1); // Critical priority incidents
  incidentGR.query();

  // Define the time threshold for sending notifications (e.g., 2 hours)
  var thresholdInHours = 2;

  while (incidentGR.next()) {
    // Calculate the time since the incident was opened
    var openedTime = new GlideDateTime(incidentGR.opened_at.getDisplayValue());
    var currentTime = new GlideDateTime();
    var timeDifference = currentTime.subtract(openedTime).getNumericValue() / 3600; // in hours

    // Check if the incident is open for more than the threshold
    if (timeDifference >= thresholdInHours) {
      // Get the manager's email address based on the assignment group
      var assignmentGroup = incidentGR.assignment_group.getDisplayValue();
      var managerEmail = getManagerEmail(assignmentGroup);

      if (managerEmail) {
        // Send an email notification to the manager
        var email = new GlideEmailOutbound();
        email.setSubject('Critical Incident Notification');
        email.setBody('Incident ' + incidentGR.number + ' is open for ' + timeDifference + ' hours.');
        email.addRecipient(managerEmail);
        email.send();
      }
    }
  }

  // Function to get manager's email based on assignment group
  function getManagerEmail(assignmentGroup) {
    var managerGR = new GlideRecord('sys_user_group');
    managerGR.addQuery('name', assignmentGroup);
    managerGR.query();
    if (managerGR.next()) {
      return managerGR.manager.user_name.getEmail(); // Adjust this based on your data model
    }
    return null;
  }
})();
