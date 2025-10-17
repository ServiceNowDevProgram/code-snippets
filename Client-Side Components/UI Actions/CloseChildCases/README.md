Name: Close all Child Case
Table:sn_customerservice_case
Condition: (gs.hasRole('sn_customerservice_agent') || gs.hasRole('admin') ) && (new GlideRecord('sn_customerservice_case').addQuery('parent', current.sys_id).query().hasNext())

Use Case: 
Provide UI action button to close all the associated child cases from the parent Case.
