Name: Close all Child Case
Table:sn_customerservice_case
Condition: (gs.hasRole('sn_customerservice_agent') || gs.hasRole('admin') )

Use Case: 
Provide UI action button to close all the associated child cases from the parent Case.
