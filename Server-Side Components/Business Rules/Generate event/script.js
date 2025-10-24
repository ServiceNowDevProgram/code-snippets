(function executeRule(current, previous /*null when async*/ ) {
    //Business rule to generate new event

    //Adding new event to queue
    //Parameters: Event name, GlideRecord Object, parm1, parm2
    gs.eventQueue('custom_event.adminRoleAssigned', current, current.user, current.sys_created_by);

})(current, previous);
