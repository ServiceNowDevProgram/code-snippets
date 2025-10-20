**Business Rule** 

Table : Any Custom Table or (Incident,Problem , Change)...
Active : true
When : before 
Update : true
order : 100 

condition : gs.getUser().getUserName() == 'integration.user/Web services User'

The rule must only run when the update is coming from the dedicated integration user to avoid impacting manual user updates, Can Update Fields to check as Required 

This business rule is designed to prevent unnecessary and redundant updates to records that are synchronized with external systems (e.g., Jira, Azure DevOps, or a custom application) via integration / E bonding 

This rule executes a check to ensure that the fields critical to the integration (Work Notes, Comments, State) have genuinely changed before allowing the update to process.
