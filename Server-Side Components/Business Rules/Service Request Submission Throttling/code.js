(function executeRule(current, gsn, gs) {
    var user = gs.getUserID();
    var windowStart = new GlideDateTime();
    windowStart.addHours(-1);

    var gr = new GlideAggregate('sc_request');
    gr.addQuery('requested_for', user);
    gr.addQuery('sys_created_on', '>=', windowStart);
    gr.addAggregate('COUNT');
    gr.query();

    if (gr.next() && parseInt(gr.getAggregate('COUNT')) >= 5) {
        gs.addErrorMessage("You have reached the request submission limit. Please wait and try again later.");
        current.setAbortAction(true);
    }
})(current, gsn, gs);
