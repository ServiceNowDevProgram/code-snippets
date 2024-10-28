(function executeRule(current, previous /*null when async*/) {
    // Check if the Resolution Notes field is filled
    if (current.resolution_notes && current.resolution_notes != '') {
        // Update the State field to Resolved
        current.state = 6; // Assuming 6 is the value for Resolved state
    }
})(current, previous);
