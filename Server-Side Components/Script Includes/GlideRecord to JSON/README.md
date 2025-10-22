# GlideRecord to JSON object converter
* Description: This script include (gr2obj) converts GlideRecord to a JSON object
* Sample Usage: 
```javascript
var gr = new GlideRecord('incident');
// Get an incident record
gr.get('96cef4561b3530108b59a8e5604bcb74');
// Call the script include
var obj = gr2obj(gr);
// Stringify the object and display
gs.info(JSON.stringify(obj));
```
* Sample Output:
```json
{"active":"true","activity_due":"","additional_assignee_list":null,"approval":"not requested","approval_history":"","approval_set":"","assigned_to":null,"assignment_group":null,"business_duration":"","business_service":null,"business_stc":null,"calendar_duration":"","calendar_stc":null,"caller_id":"System Administrator","category":"inquiry","caused_by":null,"child_incidents":"0","close_code":null,"close_notes":null,"closed_at":"","closed_by":null,"cmdb_ci":null,"comments":"","comments_and_work_notes":"","company":null,"contact_type":null,"contract":null,"correlation_display":null,"correlation_id":null,"delivery_plan":null,"delivery_task":null,"description":null,"due_date":"","escalation":"0","expected_start":"","follow_up":"","group_list":null,"hold_reason":null,"impact":"3","incident_state":"2","knowledge":"false","location":null,"made_sla":"true","notify":"1","number":"INC0010007","opened_at":"2021-08-08 03:42:27","opened_by":"System Administrator","order":null,"parent":null,"parent_incident":null,"priority":"5","problem_id":null,"reassignment_count":"0","rejection_goto":null,"reopen_count":"0","reopened_by":null,"reopened_time":"","resolved_at":"","resolved_by":null,"rfc":null,"route_reason":null,"service_offering":null,"severity":"3","short_description":"test2","sla_due":"","state":"2","subcategory":null,"sys_class_name":"incident","sys_created_by":"admin","sys_created_on":"2021-08-08 03:42:56","sys_domain":"global","sys_domain_path":"/","sys_id":"96cef4561b3530108b59a8e5604bcb74","sys_mod_count":"1","sys_tags":"","sys_updated_by":"admin","sys_updated_on":"2021-09-27 16:35:00","task_effective_number":"INC0010007","time_worked":"","u_requested_for":"Abel Tuter","universal_request":null,"upon_approval":"proceed","upon_reject":"cancel","urgency":"3","user_input":"","variables":null,"watch_list":null,"wf_activity":null,"work_end":"","work_notes":"","work_notes_list":null,"work_start":""}
```

