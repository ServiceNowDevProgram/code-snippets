# ✅ Prevent State Change with Incomplete Checklist (Business Rule)

## 📁 Location  
**Category:** `Server-Side Components`  
**Subcategory:** `Business Rules`  
**Snippet Folder:** `Checklist Completion Validator`

---

## 📌 Description

This **Business Rule** enforces completion of all associated **checklist items** on an **incident** before its **state can be changed to "In Progress"**.

If any checklist item is still incomplete, the rule **prevents the state transition**, displays a clear error message, and **aborts the update**. This ensures that required tasks or validations tied to the incident are completed before agents begin working on it.

---

## 🚀 Features

- ✅ Enforces checklist completion before progressing the incident state
- ✅ Prevents workflow bypassing by validating in the **Before Update** stage
- ✅ Uses `GlideRecord` to check both checklist and checklist_item records
- ✅ Displays user-friendly error messages in the UI
- ✅ Supports structured processes and improves agent accountability

---

## 📄 Script: `incompleteChkListShowErrMsg.js`

```javascript
// Business Rule: Before Update on Incident table
// Condition: current.state == 2 (In Progress)

(function executeRule(current, previous /*null when async*/) {
    var checklistGR = new GlideRecord("checklist");
    checklistGR.addQuery("document", current.sys_id);
    checklistGR.query();

    // Only run if state is changing to 'In Progress'
    if (current.state == 2 && previous.state != 2) {

        while (checklistGR.next()) {
            // Query checklist items tied to this record that are not complete
            var itemGR = new GlideRecord("checklist_item");
            itemGR.addQuery("checklist", checklistGR.sys_id);
            itemGR.addQuery("document", current.sys_id);      // Matches the current record
            itemGR.addQuery("complete", false);               // Only incomplete items
            itemGR.query();

            // If any incomplete item exists, abort the action
            if (itemGR.hasNext()) {
                gs.addErrorMessage("This record has incomplete checklist items. Please complete them before proceeding.");
                current.setAbortAction(true);
                break; // Stop after first checklist with incomplete items
            }
        }
    }
})(current, previous);

🛠️ How to Use

1) Create a new Business Rule on the incident table.
2) Set the following properties:
    When to run: Before
    Update: ✅ Checked
    Condition: current.state == 2 && previous.state != 2
3) Paste the provided script into the Script field.
4) Ensure checklist functionality is enabled and used in your incident form.

📸 Example Scenario

1) An agent attempts to set an incident’s state to “In Progress”.
2) The record has an attached checklist with at least one unchecked item.
3) The system displays the message:
❌ "This record has incomplete checklist items. Please complete them before proceeding."
4) The state change is blocked until all checklist items are marked complete.

📂 File Structure

Server-Side Components/
└── Business Rules/
    └── Checklist Completion Validator/
        ├── README.md
        └── incompleteChkListShowErrMsg.js

⚙️ Requirements

1) Checklist plugin must be enabled (com.glide.ui.checklist)
2) Applicable only when incidents use the checklist feature
3) Tag/state ID for “In Progress” is typically 2 (verify if customized)

✅ Contribution Checklist Compliance

✔️ Folder structure follows repository requirements
✔️ Script is scoped and relevant to ServiceNow development
✔️ Contains a complete and descriptive README.md
✔️ No XML exports or system-specific data
✔️ Clean use of native APIs (GlideRecord, setAbortAction, addErrorMessage)

👨‍💻 Author

Contributor: @Shweyy123
Pull Request: Pending
Script Name: incompleteChkListShowErrMsg.js

📘 License

This script is provided for educational and internal use. Always validate logic in a development or sub-production instance before deploying to production.

🧩 Optional Enhancements

1) Show which checklist items are incomplete in the error message
2) Automatically focus on the checklist section of the form
3) Extend to other tables like change_request or problem
