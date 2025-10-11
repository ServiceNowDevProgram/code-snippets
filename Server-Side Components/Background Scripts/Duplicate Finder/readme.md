# ServiceNow Duplicate Record Finder
A simple server-side script for ServiceNow that finds and reports on duplicate values for any field on any table. It uses an efficient `GlideAggregate` query.
## Find Duplicates by Single Field - `findDuplicatesBySingleField.js`
This finds duplicates based on a single field which matches
### How to Use
This script is designed to be run in **Scripts - Background** or as a Fix Script.
1. Navigate: Go to **System Definition > Scripts - Background** (or type sys.scripts.do in the filter navigator).
2. Copy Script: Copy the entire contents of the `findDuplicatesBySingleField.js` file.
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

## Find Duplicates by Field Combination - `findDuplicatesByCombination.js`
This is a more powerful script that finds duplicate records based on a unique combination of one or more fields.

### How to use
This script is also designed to be run in **Scripts - Background**
1. Navigate: Go to **System Definition > Scripts - Background**
2. Copy Script: Copy the entire contents of the `findDuplicatesByCombination.js` file.
3. Paste and Configure: Paste the script into the "Run script" text box. Update the `tableName` field and the `fieldNames` array. The `fieldNames` variable is an array, so even a single field must be enclosed in square brackets `[]`

```js
// --- UPDATE ONLY THE VALUES BELOW ---
var tableName = '<table_name>'; // The table you want to check.
var fieldNames = ['field_1', 'field_2']; // An array of fields for the unique combination.
```

For example, to find models with the same name, model number and manufacturer
```js
var tableName = 'cmdb_model';
var fieldNames = ['name', 'model_number', 'manufacturer'];
```

### Sample output
<img width="518" height="483" alt="image" src="https://github.com/user-attachments/assets/b5508bd8-4a3d-4478-95bd-fc6f770d4de2" />

