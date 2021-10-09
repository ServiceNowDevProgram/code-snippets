//For reference, the below code is a part of OOB 'incident events' Business Rule

if (current.active.changesTo(false)) {
  gs.eventQueue("incident.inactive", current, current.incident_state, previous.incident_state);
  gs.workflowFlush(current);   //Deletes any open scheduled job records in the Schedule (sys_trigger) table for the specified GlideRecord.
}
