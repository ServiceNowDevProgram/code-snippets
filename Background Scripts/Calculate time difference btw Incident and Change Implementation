// Query high-impact incidents
  var incidentGR = new GlideRecord('incident');
  incidentGR.addQuery('impact', '1'); 
  incidentGR.query();

  while (incidentGR.next()) {
    // Find related change requests
    var changeGR = new GlideQuery('change_request');
    changeGR.addQuery('incident', incidentGR.getUniqueValue());
    changeGR.query();

    if (changeGR.next()) {
      // Calculate the time difference between incident creation and change implementation
      var createdTime = new GlideDateTime(incidentGR.sys_created_on);
      var implementationTime = new GlideDateTime(changeGR.scheduled_start);
      var timeDifference = createdTime.subtract(implementationTime).getNumericValue() / 3600; // in hours

      // Update a custom field in the incident table with the time difference
      incidentGR.u_time_to_change_implementation = timeDifference;
      incidentGR.update();
    }
  }
