# 🔍 Duplicate Record Finder (Server-Side Script)

## 📁 Location  
**Category:** `Server-Side Components`  
**Subcategory:** `Background Scripts`  
**Snippet Folder:** `Duplicate Record Finder`  

---

## 📌 Description

This server-side script helps identify **duplicate records** within any specified table and field in a ServiceNow instance. It uses the powerful `GlideAggregate` API to group and count entries, making it easy to detect data duplication issues across records.

Designed to be executed via **Scripts - Background** or as a **Fix Script**, this utility provides fast insights into data quality without requiring complex queries or reports.

---

## 🚀 Features

- ✅ Works on **any table** and **any field**
- ✅ Uses `GlideAggregate` for efficient grouping and counting
- ✅ Outputs a clear, readable summary of duplicate values
- ✅ Helps detect issues like duplicate CI names, duplicate caller IDs, etc.
- ✅ Non-destructive — the script does not modify any records

---

## 📄 Script: `duplicate_finder.js`

```javascript
var tableName = 'incident'; // Change this to your table
var fieldName = 'caller_id'; // Change this to your field

if (!tableName || !fieldName) {
  gs.error('Table name and field name must be provided.');
} else {
  var ga = new GlideAggregate(tableName);
  ga.addAggregate('COUNT');
  ga.groupBy(fieldName);
  ga.query();

  var hasDuplicates = false;
  gs.print(`Duplicate values found in table: ${tableName}, field: ${fieldName}\n`);

  while (ga.next()) {
    var count = parseInt(ga.getAggregate('COUNT'), 10);
    if (count > 1) {
      hasDuplicates = true;
      gs.print(`Value: ${ga.getValue(fieldName)} | Count: ${count}`);
    }
  }

  if (!hasDuplicates) {
    gs.print('No duplicates found.');
  }
}

🛠️ How to Use

1) Navigate to System Definition > Scripts - Background
2) Paste the script into the editor
3) Update the tableName and fieldName variables
4) Click Run Script
5) Check the output for duplicate groups

📸 Example Output

Duplicate values found in table: incident, field: caller_id

Value: 62826bf03710200044e0bfc8bcbe5df1 | Count: 4
Value: 681ccaf9c0a8016401c5a33be04be441 | Count: 2

Note: Values shown are backend values (e.g., sys_ids for reference fields)

📂 File Structure

Server-Side Components/
└── Background Scripts/
    └── Duplicate Record Finder/
        ├── README.md
        └── duplicate_finder.js

⚙️ Requirements

✅ Admin or script execution access
✅ Valid tableName and fieldName
🔁 Optional: Extend to resolve display values using GlideRecord if needed

🧠 Use Case Examples

1) Find duplicate caller_id values in the incident table
2) Detect duplicated serial_number values in cmdb_ci_computer
3) Validate unique constraints during data imports or migrations

✅ Contribution Checklist Compliance

✔️ Follows proper folder structure
✔️ Contains a descriptive README.md
✔️ Code is focused, relevant, and self-contained
✔️ Does not include XML exports or sensitive data
✔️ Uses ServiceNow-native APIs (GlideAggregate)

👨‍💻 Author

Contributor: @Shweyy123
Pull Request: #1846
Script Name: duplicate_finder.js
Compatibility: Applicable to any ServiceNow version supporting GlideAggregate

📘 License

This script is open-source and provided for educational and development use. Always test in sub-production environments before applying to production data.

🧩 Optional Enhancements

1) Add logic to resolve display values from reference fields
2) xtend output to a downloadable CSV format
3) Turn into a Script Include or Scoped App utility

