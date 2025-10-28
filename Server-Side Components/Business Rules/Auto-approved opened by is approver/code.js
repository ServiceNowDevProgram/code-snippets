(function executeRule(current, previous /*null when async*/ ) {

    try {
        gs.setWorkflow(false);
        if (!current.sysapproval)
            return;

        // Get the parent record (RITM / REQ / etc.)
        var parent = current.sysapproval.getRefRecord();
        if (!parent || !parent.isValidRecord())
            return;

        if (parent.getTableName() == "sc_req_item") {

            // Load Opened By user record
            var userGR = new GlideRecord("sys_user");
            if (!userGR.get(parent.requested_for))
                return;


            // If approver == Opened By → auto-approve
            if (current.approver == parent.opened_by) {
                current.state = "approved";
                current.comments = "Auto-approved as " + current.getDisplayValue("approver") + " is the manager of Requested For";
                current.update();

                // Also update parent RITM stage to 'Approved'
                parent.stage = "approved";
                parent.update();
            }
        }

    } catch (ex) {
        gs.error("Auto-approval BR error: " + ex.message);
    }

})(current, previous);
