(function executeRule(current, previous /*, gs, sup*/) {

  // Check if the close_code field is empty or null
  // You can add other fields to this check, e.g., || gs.nil(current.close_notes)
  if (gs.nil(current.close_code)) {

      // Display an error message at the top of the form
      gs.addErrorMessage('A Close Code is required before closing an incident.');

      // Stop the database action (update) from happening
      current.setAbortAction(true);
  }

})(current, previous);