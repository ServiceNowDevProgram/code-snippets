(function executeRule(current, gsn, gs) {

    var limit = 3;
    var windowMins = 10;

    var recentIncidents = new GlideRecord('incident');
    recentIncidents.addQuery('caller_id', current.caller_id);
    
    var now = new GlideDateTime();
    var cutoff = new GlideDateTime();
    cutoff.addMinutes(-windowMins);
    
    recentIncidents.addQuery('sys_created_on', '>=', cutoff);
    recentIncidents.query();

    var count = 0;
    while (recentIncidents.next()) {
        count++;
    }

    if (count >= limit) {
        gs.addErrorMessage("You have submitted too many incidents in a short time. Please wait before submitting more.");
        current.setAbortAction(true);
    }

})(current, gsn, gs);
