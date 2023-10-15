 // Query open incidents with priority 1 (critical)
  var incidentGR = new GlideRecord('incident');
  incidentGR.addQuery('active', true);
  incidentGR.addQuery('priority', '1');
  incidentGR.query();

  while (incidentGR.next()) {
    // Check if a related problem record with the same short description exists
    var problemGR = new GlideRecord('problem');
    problemGR.addQuery('short_description', incidentGR.short_description);
    problemGR.query();

    if (problemGR.next()) {
      // Update the problem record based on incident data
      problemGR.state = 'in_progress';
      problemGR.work_notes = 'Incident ' + incidentGR.number + ' is related.';
      problemGR.update();
    } else {
      // Create a new problem record based on the incident data
      var newProblemGR = new GlideRecord('problem');
      newProblemGR.initialize();
      newProblemGR.short_description = incidentGR.short_description;
      newProblemGR.description = incidentGR.description;
      newProblemGR.insert();
    }
  }
