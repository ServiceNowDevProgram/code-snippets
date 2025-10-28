Usage : Executes a business rule to verify if the JSON object saved in the property is a valid JSON. 

Steps for Creating the Business Rule:

Navigate to Business Rules:
  - Go to System Definition > Business Rules in ServiceNow.
  - Create a New Business Rule:
  - Click New to create a new business rule.

Fill in Basic Information:
 - Name: Provide a name like Validate JSON in Properties Table.
 - Table: Set the table to properties(sys_properties).
 - When to Run: Choose Before so that it validates before the record is saved.
 - Insert: Select True to run on insert.
 - Update: Select True to run on update (if needed).
   
Add Conditions (optional):
 - Set conditions if you only want to validate the JSON under certain circumstances. For instance, you can add conditions like

   value "starts with" { OR
   value "starts with" [ AND
   value "ends with" } OR
   value "ends with" ] OR

  to check specific fields.

Add the Script:

Under the Advanced tab, write the script to validate the JSON object. The script is mentioned in the jsonPropertyValidator.js file.
