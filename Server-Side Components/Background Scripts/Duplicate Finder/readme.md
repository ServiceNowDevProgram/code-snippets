## ServiceNow Duplicate Record Finder
A simple server-side script for ServiceNow that finds and reports on duplicate values for any field on any table. It uses an efficient GlideAggregate query and formats the results into a clean, readable report.

### How to Use
This script is designed to be run in **Scripts - Background** or as a Fix Script.
1. Navigate: Go to **System Definition > Scripts - Background** (or type sys.scripts.do in the filter navigator).
2. Copy Script: Copy the entire contents of the script.js file.
3. Paste and Configure: Paste the script into the "Run script" text box. Add the table to search in `tableName` and the field to search for duplicates in `fieldName`
  ```js
  // Update ONLY below values to find duplicates
  var tableName = '<table_name>'; // ADD: Table you want for duplicates
  var fieldName = 'field_name';	// ADD: Field that you want to check for duplicates
  ```
  For example, to find duplicate email addresses in the User table:
  ```js
  var tableName = 'sys_user';
  var fieldName = 'email';;
  ```
  To find incidents with the same short description:
  ```js
  var tableName = 'incident';
  var fieldName = 'short_description';
  ```


4. Run Script: Click the "Run script" button. The results will be displayed on the screen below the editor.

