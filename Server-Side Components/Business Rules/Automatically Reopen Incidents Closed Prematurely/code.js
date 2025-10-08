(function executeRule(current, previous /*null when async*/) {

    var wasClosed = previous.state == 7; // Closed
    var isNowActive = current.state != 7;

    var closureTime = new GlideDateTime(previous.sys_updated_on);
    var now = new GlideDateTime();
    var minutesSinceClosure = GlideDateTime.subtract(now, closureTime).getNumericValue() / (1000 * 60);

    if (wasClosed && isNowActive && minutesSinceClosure < 5) {
        gs.eventQueue('incident.reopened_quickly', current, current.assigned_to, gs.getUserID());

        current.work_notes = 'Reopened automatically — user reopened within 5 minutes of closure.';

        // Optionally flag the incident
        current.u_reopened_flag = true;
    }

})(current, previous);
