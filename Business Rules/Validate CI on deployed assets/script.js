(function executeRule(current, previous /*null when async*/) {


    // Only act if asset is deployed and has no CI
    if (current.install_status == 'Deployed' && !current.ci) {
        // Get the user assigned to the asset
        var userGR = new GlideRecord('sys_user');
        if (userGR.get(current.assigned_to.toString())) {
            var manager = userGR.manager;
            if (manager) {
                // Send notification to manager
                gs.eventQueue('asset.ci.missing', current, manager.toString(), current.assigned_to.toString());
                gs.info("[Asset-CI Check] Notification sent to manager: " + manager.name);
            } else {
                gs.info("[Asset-CI Check] Assigned user has no manager.");
            }
        } else {
            gs.info("[Asset-CI Check] Assigned user not found.");
        }
    }



})(current, previous);
