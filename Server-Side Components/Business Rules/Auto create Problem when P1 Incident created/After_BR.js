function executeRule(current, previous /*null when async*/ ) {
  if (current.priority == 1 && current.operation() == 'insert') {
    var problemGR = new GlideRecord('problem');
    problemGR.initialize();
    problemGR.short_description = current.short_description;
    problemGR.description = current.description;
    problemGR.cmdb_ci = current.cmbi_ci;

    var problemID = problemGR.insert();

    if (problemID) {
      current.problem-id = problemID;
      current.update();
    }
  }
})(current, previous);

  
