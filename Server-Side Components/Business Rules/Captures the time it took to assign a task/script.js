(function executeRule(current, previous /*null when async*/) {

    // Only proceed if assigned_to changed AND is not empty/null
    if (current.assigned_to.changes() && !gs.nil(current.assigned_to)) {
        
        gs.info("Assigned_to changed and assigned_to is: " + current.assigned_to);

        // Only set u_assigned_time if empty
        if (!current.u_assigned_time) {
            
            var assignedTime = new GlideDateTime();
            current.u_assigned_time = assignedTime;

            var createdTime = new GlideDateTime(current.sys_created_on);

            var diffMillis = assignedTime.getNumericValue() - createdTime.getNumericValue();
            var diffMinutes = diffMillis / (1000 * 60);

            gs.info("Time difference in minutes: " + diffMinutes);

            // Assuming u_time_to_assign is a string field
            current.u_time_to_assign = diffMinutes.toFixed(2) + " minutes";
            
            gs.info("Set u_time_to_assign to: " + current.u_time_to_assign);
        } else {
            gs.info("u_assigned_time already set: " + current.u_assigned_time);
        }
    } else {
        gs.info("Assigned_to not changed or is empty.");
    }

})(current, previous);
