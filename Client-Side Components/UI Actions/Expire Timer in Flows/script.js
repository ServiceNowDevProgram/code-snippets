/*
This script should be placed in the UI action on the table sys_flow_context form view.
This UI action should be marked as client.
Use runClientCode() function in the Onclick field.
*/
function runClientCode() {

    if (confirm('Are you sure you want to Expire the Timer activity ?\n\nThis Action Cannot Be Undone!')) {
        //Call the UI Action and skip the 'onclick' function
        gsftSubmit(null, g_form.getFormElement(), 'ExpireTimer'); //MUST call the 'Action name' set in this UI Action
    } else {
        return false;
    }
}

if (typeof window == 'undefined') {
    ExpireTimer();
}

function ExpireTimer() {
    var grTrigger = new GlideRecord('sys_trigger');
    grTrigger.addQuery('name', 'flow.fire');
    grTrigger.addQuery('script', 'CONTAINS', current.sys_id);
    grTrigger.addQuery('state', 0);
    grTrigger.setLimit(1);
    grTrigger.query();
    if (grTrigger.next()) {
        var grEvent = new GlideRecord('sysevent');
        grEvent.initialize();
        grEvent.setNewGuid();
        grEvent.setValue('name', 'flow.fire');
        grEvent.setValue('queue', 'flow_engine');
        grEvent.setValue('parm1', grTrigger.getValue('job_context').toString().slice(6));
        grEvent.setValue('parm2', '');
        grEvent.setValue('instance', current.sys_id);
        grEvent.setValue('table', 'sys_flow_context');
        grEvent.setValue('state', 'ready');
        grEvent.setValue('process_on', new GlideDateTime().getValue()); //aka run immediately
        grEvent.insert();
        grTrigger.deleteRecord();
        gs.addInfoMessage("You have chosen to end any timers related to this flow.");
    }


    action.setRedirectURL(current);
}
