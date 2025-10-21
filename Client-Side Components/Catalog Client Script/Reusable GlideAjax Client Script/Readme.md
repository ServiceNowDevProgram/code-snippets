This solution provides a generic and reusable GlideAjax-based client-server interaction in ServiceNow that allows querying any table by passing:

Table name
Key field and value
Desired fields to retrieve

It dynamically returns field values from the server and populates them on the form, making it ideal for use cases like CMDB enrichment, entitlement lookups, or dynamic form population.

1. Client Script (onChange)
Triggers on field change.
Sends parameters to the Script Include via GlideAjax.
Receives JSON response and sets target field value.

Parameters:
sysparm_table_name: Table to query (e.g., sys_user)
sysparm_key_field: Field to match (e.g., sys_id)
sysparm_key_value: Value to match
sysparm_fields: Comma-separated list of fields to retrieve

2. Script Include: DynamicTableQueryUtil
   
Processes incoming parameters.
Queries the specified table and retrieves requested fields.
Supports both standard fields and catalog item variables.
Returns a JSON object with field values and display values.
