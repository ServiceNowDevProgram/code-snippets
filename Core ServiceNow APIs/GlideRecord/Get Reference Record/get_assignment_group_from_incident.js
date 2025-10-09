function getAssignmentGroup(grIncident) {
  var grGroup = grIncident.assignment_group.getRefRecord();
  if (grGroup.isValidRecord()) {
    gs.print(grGroup.getValue("name"));
  }
}
