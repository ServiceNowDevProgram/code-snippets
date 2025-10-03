(function executeRule(current, previous /*null when async*/ ) {

    // Query for any child incidents related to the current parent incident.
    var childIncidents = new GlideRecord('incident');
    childIncidents.addQuery('parent_incident', current.sys_id);
    childIncidents.addEncodedQuery('state!=6^ORstate!=7^ORstate!=8');  // state is not closed,Resoved,cancelled
    childIncidents.addActiveQuery();
    childIncidents.query();
    // Check if any open child incidents were found.
    if (childIncidents.getRowCount() > 0) {
        var childNumbers = [];
        while (childIncidents.next()) {
            childNumbers.push(childIncidents.number.toString());
        }
        // Display an error message with the open child incident numbers.
        gs.addErrorMessage('Cannot close this incident. Please close the following child incidents first: ' + childNumbers.join(', '));
        //prevent saving the record
        current.setAbortAction(true);
    }

})(current, previous);
