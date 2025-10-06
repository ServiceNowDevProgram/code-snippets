# 🎨 Dynamic Field Background Color Based on Choice Value

## 📁 Location  
**Category:** `Client-Side Components`  
**Subcategory:** `Client Scripts`  
**Snippet Folder:** `Field Background Color OnChange`  

---

## 📌 Description

This client-side `onChange` script dynamically updates the **background color** of a **choice field** based on the selected **backend value**.

This visual enhancement improves form usability by making key field states (like priority or status) more immediately recognizable, reducing user error and boosting efficiency.

---

## 🚀 Features

- ✅ Uses `g_form.getControl()` to access the field’s DOM element
- ✅ Color-codes based on backend values, not display labels
- ✅ Easy to customize — works with any choice field
- ✅ Executes only on field value change (not on form load)
- ✅ Improves UX with real-time visual feedback

---

## 📄 Script: `setColor.js`

```javascript
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return;

  // Map backend choice values to colors
  var colorMap = {
    '1': '#e74c3c',  // Critical - Red
    '2': '#e67e22',  // High - Orange
    '3': '#f1c40f',  // Moderate - Yellow
    '4': '#3498db',  // Low - Blue
    '5': '#27ae60'   // Planning - Green
  };

  // Replace 'priority' with your actual field name
  var fieldControl = g_form.getControl('priority');
  if (!fieldControl) return;

  fieldControl.style.backgroundColor = colorMap[newValue] || '';
}

🛠️ How to Use

1) Create a Client Script in ServiceNow:

    Type: onChange
    Field: e.g., priority
    Table: Your target table (e.g., incident or task)
    Script: Use the code provided in setColor.js

2) Customize if needed:

    Change 'priority' to the name of your field
    Modify the colorMap values to match your field’s backend values and desired colors.


📸 Example Use Case

You're building a form where priority is a required field. You want high-priority issues to stand out visually:

1) Critical (value: 1) turns the field red
2) High (value: 2) turns it orange
3) Low or Planning priorities show in blue or green

This helps agents recognize and prioritize tasks more quickly.

📂 File Structure

Client-Side Components/
└── Client Scripts/
    └── Field Background Color OnChange/
        ├── README.md
        └── setColor.js

✅ Requirements Checklist

✔️ Script is in a properly named snippet folder
✔️ Code is relevant and useful to ServiceNow developers
✔️ No XML exports or platform-specific data
✔️ README.md included with:

 Description
 Usage instructions
 Example code
 Folder structure

✔️ No use of sensitive data or global variables
✔️ Works with standard choice fields in the platform


👨‍💻 Author

Contributor: @Shweyy123
Pull Request: #1845
Script Name: setColor.js
Compatibility: Works with most ServiceNow instances (Orlando and later)

📘 License

This code is provided under the MIT License. Use at your own discretion in production environments. Always test in a sub-production instance first.

🧩 Additional Ideas (Optional Enhancements)

1) Show display values alongside color mapping
2) Add a tooltip with the priority name
3) Extend support for multiple fields (e.g., priority + state)
