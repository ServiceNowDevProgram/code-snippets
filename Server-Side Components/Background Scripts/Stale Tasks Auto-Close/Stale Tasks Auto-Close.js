var staleDays = 7;
var closeDays = 14;
var reminderGR = new GlideRecord('task');
reminderGR.addActiveQuery();
reminderGR.addEncodedQuery('sys_updated_onRELATIVELE@dayofweek@ago@' + staleDays);
reminderGR.query();
while (reminderGR.next()) {
    gs.eventQueue('task.reminder', reminderGR, reminderGR.assigned_to, staleDays + ' days without update.');
    }

var closeGR = new GlideRecord('task');
closeGR.addActiveQuery();
closeGR.addEncodedQuery('sys_updated_onRELATIVELE@dayofweek@ago@' + closeDays);
closeGR.query();
while (closeGR.next()) {
    closeGR.state = 3; // Closed
    closeGR.update();
    }
