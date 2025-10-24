## ServiceNow Fix Script: Remove Extra Spaces
A generic ServiceNow fix script to clean data by removing extra whitespace from any specified field on any table.

### Problem It Solves
This script resolves data integrity issues caused by inconsistent user input, such as:
- Leading or trailing spaces (e.g., " Hello World ").
- Multiple spaces between words (e.g., "Hello   World").
  
### How to use
1. Create and Configure the Fix Script
    - First, create a new Fix Script in your ServiceNow instance (**System Definition > Fix Scripts**) add past the code

2. Add your table name and field that you want to clean up
    - Before running, you must update the following variables inside the script to define your target:
      ```js
      var tableName = 'incident'; // <-- CHANGE THIS to your table name
      var fieldName = 'short_description'; // <-- CHANGE THIS to your field name
      ```

3. Change `processRecords` value and run
    - To see what changes will be made without actually updating records, ensure the `processRecords` variable in the script is set to `false`
      ```js
      var processRecords = false;
      ```
    - To actually do the update, change the `processRecords` variable to `true` and run the script
      ```js
      var processRecords = true;
      ```

4. Run the script
