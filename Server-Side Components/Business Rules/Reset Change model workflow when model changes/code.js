//This Business rule will reset a change workflow ,when the change model changes
(function executeRule(current, previous /*null when async*/) {

    // Create a new instance of the Workflow class
    var wkfw = new Workflow();
  
    // Delete the workflow associated with the current record
     wkfw.deleteWorkflow(current);

})(current, previous);
