(function executeRule(current, previous /*null when async*/) {

    if (!current.initiated_from.nil()) {

        var inc = new GlideRecord('incident');
        if (inc.get(current.initiated_from)) {

            // Link the Work Order reference to the Incident
            inc.u_work_order = current.sys_id;

            // Move the Incident to On Hold and set Hold Reason
            inc.state = 3;                 // 3 = On Hold
            inc.hold_reason = '2';         // Awaiting Field Work Order (custom choice value created)

            // Add work note 
            inc.work_notes = 'Work Order ' + current.number + ' has been created and Incident moved to On Hold.';

            inc.update();
        }
    }

})(current, previous);
