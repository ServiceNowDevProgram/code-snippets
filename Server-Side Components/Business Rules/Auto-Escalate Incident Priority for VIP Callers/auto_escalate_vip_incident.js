(function executeRule(current, previous /*null when async*/) {

    // Check if the caller is flagged as a VIP user
    var caller = new GlideRecord('sys_user');
    if (caller.get(current.caller_id)) {
        var isVIP = caller.getValue('vip'); // Boolean field on sys_user

        if (isVIP === '1' || isVIP === 'true') {
            // Escalate priority to '1 - Critical' and urgency to '1 - High'
            current.setValue('priority', '1');
            current.setValue('urgency', '1');
            current.setValue('impact', '1');

            // Log the escalation in the work notes
            current.work_notes =
                'Priority automatically escalated to Critical. ' +
                'Caller ' + caller.getDisplayValue('name') + ' is a VIP user.';
        }
    }

})(current, previous);
