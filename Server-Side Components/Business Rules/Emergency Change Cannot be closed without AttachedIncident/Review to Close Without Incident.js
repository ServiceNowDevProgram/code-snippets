//before business rule is used and update only checked
//conditions were type is emergency AND State changes to closed
// if these conditions met and there is no attached incidents to this emergency change request then, we don't let the user to close the Change request

(function executeRule(current, previous /*null when async*/ ) {

    var inc = new GlideAggregate('incident');//we glide the incident table to get the value of current change request having any incidents or not
    inc.addQuery("rfc", current.getUniqueValue()); //instead of sys_id we used getUniqueValue
    inc.query();
	//if any incident found then its fine and we can move it to close state
  ..if No incident found then we will abort the action and send's a pop-up message to the user
    if (!inc.hasNext()){
        gs.addErrorMessage('Emergency change cannot be moved from review to close without an attached incident in Incidents Fixed by change');
        current.setAbortAction(true);
    }
})(current, previous);
