There is a simple way, how the generated SQL query can be checked, without activating the SQL Debugger feature in the navigator.

Here you can see a small code snippet:
```JS
try {
	gs.trace(true);
	var incGr = new GlideRecord("incident");
	incGr.setLimit(10);
	incGr.orderByDesc("sys_created_on");
	incGr.query();
}
finally {
	gs.trace(false);
}
```
By enabling the trace feature, the generated SQL query will be visible in the output:
```SQL
SELECT task0.`sys_id`
FROM task task0
IGNORE index(sys_created_on)
WHERE task0.`sys_class_name` = 'incident'
ORDER BY task0.`sys_created_on` DESC
LIMIT 0, 10
```

Another example:
```JS
try {
	gs.trace(true);
	var incGr = new GlideRecord("incident");
	incGr.setLimit(10);
	incGr.orderByDesc("sys_created_on");
	incGr.query();
	while (incGr.next()) {
		gs.info("Number: " + incGr.getValue("number") + " Created: " + incGr.getValue("sys_created_on"));
	}
}
finally {
	gs.trace(false);
}
```

```SQL
SELECT task0.`sys_id`
FROM task task0
IGNORE index(sys_created_on)
WHERE task0.`sys_class_name` = 'incident'
ORDER BY task0.`sys_created_on` DESC
LIMIT 0, 10
```
```SQL
SELECT task0.`parent`,
       task0.`a_ref_3` AS `caused_by`,
       task0.`watch_list`,
       task0.`upon_reject`,
       task0.`sys_updated_on`,
       task0.`a_str_5` AS `origin_table`,
       task0.`approval_history`,
       task0.`skills`,
       task0.`number`,
       task0.`state`,
       task0.`sys_created_by`,
       task0.`knowledge`,
       task0.`order`,
       task0.`cmdb_ci`,
       task0.`delivery_plan`,
       task0.`impact`,
       task0.`contract`,
       task0.`active`,
       task0.`work_notes_list`,
       task0.`priority`,
       task0.`sys_domain_path`,
       task0.`rejection_goto`,
       task0.`business_duration`,
       task0.`group_list`,
       task0.`approval_set`,
       task0.`wf_activity`,
       task0.`universal_request`,
       task0.`short_description`,
       task0.`correlation_display`,
       task0.`work_start`,
       task0.`delivery_task`,
       task0.`additional_assignee_list`,
       task0.`a_int_1` AS `notify`,
       task0.`sys_class_name`,
       task0.`service_offering`,
       task0.`closed_by`,
       task0.`follow_up`,
       task0.`a_ref_7` AS `parent_incident`,
       task0.`a_ref_5` AS `reopened_by`,
       task0.`reassignment_count`,
       task0.`assigned_to`,
       task0.`variables`,
       task0.`sla_due`,
       task0.`comments_and_work_notes`,
       task0.`agile_story`,
       task0.`escalation`,
       task0.`upon_approval`,
       task0.`correlation_id`,
       task0.`made_sla`,
       task0.`a_int_6` AS `child_incidents`,
       task0.`a_int_8` AS `hold_reason`,
       task0.`task_effective_number`,
       task0.`a_ref_6` AS `resolved_by`,
       task0.`sys_updated_by`,
       task0.`opened_by`,
       task0.`user_input`,
       task0.`sys_created_on`,
       task0.`sys_domain`,
       task0.`route_reason`,
       task0.`a_int_4` AS `calendar_stc`,
       task0.`closed_at`,
       task0.`business_service`,
       task0.`a_str_11` AS `business_impact`,
       task0.`a_ref_2` AS `rfc`,
       task0.`time_worked`,
       task0.`expected_start`,
       task0.`opened_at`,
       task0.`work_end`,
       task0.`a_dtm_1` AS `reopened_time`,
       task0.`a_dtm_2` AS `resolved_at`,
       task0.`a_ref_4` AS `caller_id`,
       task0.`a_str_3` AS `subcategory`,
       task0.`work_notes`,
       task0.`a_str_7` AS `close_code`,
       task0.`assignment_group`,
       task0.`a_int_5` AS `business_stc`,
       task0.`a_str_10` AS `cause`,
       task0.`description`,
       task0.`a_str_2` AS `origin_id`,
       task0.`calendar_duration`,
       task0.`close_notes`,
       task0.`sys_id`,
       task0.`contact_type`,
       task0.`a_int_2` AS `incident_state`,
       task0.`urgency`,
       task0.`a_ref_1` AS `problem_id`,
       task0.`company`,
       task0.`activity_due`,
       task0.`a_int_3` AS `severity`,
       task0.`comments`,
       task0.`approval`,
       task0.`due_date`,
       task0.`sys_mod_count`,
       task0.`a_int_7` AS `reopen_count`,
       task0.`location`,
       task0.`a_str_1` AS `category`
FROM task task0
WHERE task0.`sys_class_name` = 'incident'
  AND task0.`sys_id` IN ('9060975f472d4210a53cdbe4116d4311',
                         '9e7f9864532023004247ddeeff7b121f',
                         'd71f7935c0a8016700802b64c67c11c6',
                         'a9a16740c61122760004fe9095b7ddca',
                         'd71b3b41c0a8016700a8ef040791e72a',
                         'd7195138c0a8016700fd68449cfcd484',
                         'd7158da0c0a8016700eef46c8d1f3661',
                         'ef43c6d40a0a0b5700c77f9bf387afe3',
                         'ef4225a40a0a0b5700d0b8a790747812',
                         'a9e30c7dc61122760116894de7bcc7bd')
```
