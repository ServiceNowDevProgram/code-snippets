var incidentCheck = new GlideAggregate('incident');
  incidentCheck.addQuery('cmdb_ci', current.cmdb_ci); // Or any specific CI
  incidentCheck.addQuery('opened_at', '>', 'javascript:gs.minutesAgoStart(60)');
  incidentCheck.addAggregate('COUNT');
  incidentCheck.query();
  
  if (incidentCheck.next() && parseInt(incidentCheck.getAggregate('COUNT')) > 5) {
      var problem = new GlideRecord('problem');
      problem.initialize();
      problem.short_description = 'Multiple incidents reported for CI: ' + current.cmdb_ci.getDisplayValue();
      problem.cmdb_ci = current.cmdb_ci;
      problem.insert();
  }
