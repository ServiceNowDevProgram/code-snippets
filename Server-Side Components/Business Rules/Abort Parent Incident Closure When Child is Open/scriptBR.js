(function executeRule(current, previous /*null when async*/) {
    
    
    //When the Incident state values are set to: 6 (Resolved), 7 (Closed), 8 (Cancelled).
    // The `previous.state` check prevents the script from running when a closed ticket is re-closed.
    if ((current.state == '6' || current.state == '7' || current.state == '8') && current.state != previous.state) {

        // Use GlideAggregate to efficiently count child incidents that are not yet closed.
        var ga = new GlideAggregate('incident');
        ga.addQuery('parent_incident', current.sys_id);
        ga.addActiveQuery();
        ga.addAggregate('COUNT');
        ga.query();
        var childCount = 0;
        if (ga.next()) {
            // Retrieve the aggregated count.
            childCount = ga.getAggregate('COUNT');
        }
        // If open child incidents are found, abort the parent's closure and display an error.
        if (childCount > 0) {
            gs.addErrorMessage('Cannot close this incident. ' + childCount + ' child incidents are still open.');
            current.setAbortAction(true);
        }
    }

})(current, previous);
