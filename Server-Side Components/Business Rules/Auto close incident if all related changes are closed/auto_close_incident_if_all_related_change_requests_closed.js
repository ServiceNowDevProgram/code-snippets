(function executeRule(current, previous /*null when async*/) {
    // Run only when change_request moves to Closed
    if (current.state != previous.state && current.state == 3) { // 3 = Closed
        var incidentSysId = current.incident;  // assuming there is a reference field to Incident
        
        if (!incidentSysId) {
            gs.info("No related incident found for this change request: " + current.number);
            return;
        }

        // Query for other open change requests linked to the same incident
        var otherCR = new GlideRecord('change_request');
        otherCR.addQuery('incident', incidentSysId);
        otherCR.addQuery('sys_id', '!=', current.sys_id);
        otherCR.addQuery('state', '!=', 3); // not closed
        otherCR.query();

        if (otherCR.hasNext()) {
            gs.info("Incident " + incidentSysId + " still has open change requests. Not closing incident.");
            return;
        }

        // If no open change requests remain, close the incident
        var inc = new GlideRecord('incident');
        if (inc.get(incidentSysId)) {
            inc.state = 7; // 7 = Closed (modify as per your instance)
            inc.close_code = 'Auto Closed';
            inc.close_notes = 'Incident auto-closed as all associated change requests are closed.';
            inc.update();
            gs.info("Incident " + inc.number + " auto-closed as all related change requests are closed.");
        }

    }
})(current, previous);

