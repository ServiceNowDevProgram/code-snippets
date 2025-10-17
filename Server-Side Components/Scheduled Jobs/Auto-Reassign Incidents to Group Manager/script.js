var grInc = new GlideRecord('incident');
grInc.addQuery('state', 2); // 2 = In Progress
grInc.addQuery('sys_updated_on', '<=', gs.daysAgoStart(15));
grInc.query();

while (grInc.next()) {
if (!grInc.assignment_group) 
  continue;

// Find the group manager
var group = new GlideRecord('sys_user_group');
if (group.get(grInc.assignment_group) && group.manager) {
grInc.assigned_to = group.manager;
grInc.work_notes = 'System: Reassigned to group manager : "+group.manager+"due to inactivity (15+ days).';
grInc.update();
}
}
