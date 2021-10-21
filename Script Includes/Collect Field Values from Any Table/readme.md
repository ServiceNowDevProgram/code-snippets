# Universal Field Collector (Ajax Version Script Include)
- This SI allows for users to request any field values from any table (except if security restrictions prevent) for any one particular record
- In Client script, instantiate GlideAjax with this script include
- Call function `getDetails`
- Pass in the following parameters in this order
- (Table_Name, Sys_id, "field_Name_1,field_name_2")
- Note: fields requested from record need to be the format of a commas seperated string
- XMLAnswer will return stringified JSON object which can then be parsed in client script callback function
