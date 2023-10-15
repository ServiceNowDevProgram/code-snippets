 var assignmentGroups = new GlideQuery('sys_user_group');
  assignmentGroups.query();
  
  while (assignmentGroups.next()) {
    var groupCount = new GlideQuery('incident');
    groupCount.addQuery('active', true);
    groupCount.addQuery('assignment_group', assignmentGroups.getValue('sys_id'));
    groupCount.query();
    
    gs.info('Assignment Group: ' + assignmentGroups.getValue('name') + ', Active Incidents: ' + groupCount.getRowCount());
  }
