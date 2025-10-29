// Business Rule: Set Resolution SLA on Related Tasks
// Table: task_sla
// When: After Insert

// PURPOSE:
// When a new Task SLA is created for Resolution SLA, update the related records.

// CONDITIONS:
// SLA Definition target = "Resolution"
// Run only if task is Incident or SC Task
// (current.task.sys_class_name == 'incident' || current.task.sys_class_name == 'sc_task')

// STEP 1:
// Get the related Incident record from current.task reference
var inc = new GlideRecord('incident'); // Query Incident table
inc.get(current.task); // Fetch the matching incident record

// Update Incident’s custom field to store the Resolution SLA reference
inc.u_resolution_sla = current.sys_id; // Set current task_sla sys_id
inc.update(); // Save changes to Incident

// STEP 2:
// Get the related Task record from current.task reference
var tsk = new GlideRecord('task'); // Query Task table
tsk.get(current.task); // Fetch the task (incident/sc_task/etc.)

// Update Task’s custom field to store the Resolution SLA reference
tsk.u_task_resolution_sla = current.sys_id; // Set current task_sla sys_id
tsk.update(); // Save changes to Task
