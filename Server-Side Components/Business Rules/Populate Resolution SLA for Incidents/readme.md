📘 README — Auto Update Resolution SLA on Related Tasks
Business Rule Details

Name: Auto Update Resolution SLA Reference
Table: task_sla
Execution: After Insert
Filter Condition: SLA Definition target must be Resolution
Condition: Runs only when the associated task is an Incident or a Catalog Task
(current.task.sys_class_name == 'incident' || current.task.sys_class_name == 'sc_task')

Purpose

This Business Rule is designed to automatically update the related Incident and Task records with the Resolution SLA reference when a new Task SLA record is created.
It helps provide direct visibility of SLA details from the Incident or Task form without navigating to the task_sla table.

How It Works

A new Resolution SLA is created for a task.

This rule triggers after the Task SLA record is inserted.

It checks if the related task is an Incident or a Catalog Task.

It updates the custom SLA reference fields on both the Incident and the Task.

Prerequisites

You must create the following fields before using this rule:

Field: u_resolution_sla (On Incident table)
Type: Reference to task_sla

Field: u_task_resolution_sla (On Task table)
Type: Reference to task_sla

Testing Steps

• Create a new Incident and associate a Resolution SLA with it.
• Allow the SLA to start (so it creates a task_sla entry).
• Open the Incident and related Task.
• You should see the Resolution SLA reference auto-populated in both.

Script Used
(function executeRule(current, previous /*null when async*/ ) {

    var inc = new GlideRecord('incident');
    inc.get(current.task);

    inc.u_resolution_sla = current.sys_id;
    inc.update();
	
    var tsk = new GlideRecord('task');
    tsk.get(current.task);

    tsk.u_task_resolution_sla = current.sys_id;
    tsk.update();

})(current, previous);

Result

This automation ensures the SLA is visible and reportable on both Incident and Task records with no manual updates.
It improves SLA tracking, reporting, and overall usability.
