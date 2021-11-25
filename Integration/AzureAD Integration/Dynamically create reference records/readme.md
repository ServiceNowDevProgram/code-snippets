******* READ ME FOR AZURE USER PROVISIONING TO MAINTAIN REFERENCE FIELDS/TABLES ***** https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0779148

Because the Microsoft provided Azure Enterprise intergation with servicenow only creates records on the sys_user and sys_user_group tables this removes our ability to maintain the fields/tables that are referenced by these records (core tables).

This typically would be handled by a "Choice Action" of "create" on a transform map (in comparision to a typical LDAP user provisioning configuration).

In order to regain this functionality we must change the attribute mapping from within the Azure admin panel to map the attributes which correspond to these reference values to custom string fields on the ServiceNow side. (i.e u_department) once we are mapping these values to a custom string field we will manually add the "Find/Create" logic within a business rule configured to fire anytime these custom field values change.

Sudo logic is as follows(u_location example):

if u_location changes query for record on cmn_location with the same name if found result return sys_id if no result intitialize gliderecord, insert return new record sys_id

//relate returned sys_id in OOB reference field current.location = result.sys_id