//This code helps in restricting the change from moving new to assess state in case of any conflicts are there in the new state.
//This is a business rule in which, i used before business rules and update(checked)
//when to run condition is state changes to Assess
//change_request Table

(function executeRule(current, previous /*null when async*/) {
  var conflictStop = new GlideRecord("conflict"); //gliding conflict table
  //get any existing conflicts from the current record
  conflictStop.addQuery("change", current.getUniqueValue());
  conflictStop.addQuery("configuration_item", current.cmdb_ci);
  conflictStop.query();
  // if any conflict is found from the current record then will stop the record from moving further and will show an error message to the user.
  if (conflictStop.hasNext()) {
    gs.addErrorMessage(
      "state cannot be moved from new to assess without clearing the conflicts, conflicts should not crossed but need to scheduled."
    );
    current.setAbortAction(true);
  }
})(current, previous);
