# 🏷️ Caller-Initiated Comment Tagging (Business Rule)

## 📁 Location  
**Category:** `Server-Side Components`  
**Subcategory:** `Business Rules`  
**Snippet Folder:** `Caller Comment Tagging`  

---

## 📌 Description

This `after update` Business Rule adds or removes a **tag (`label_entry`)** on an **incident record** based on who updated the **Additional Comments** field:

- ✅ If the **caller** updates the comment, a tag is **added** (e.g., “Caller Responded”).
- 🚫 If anyone else (e.g., an agent or fulfiller) updates the comment, the tag is **removed**.

This helps highlight incidents where the **caller has re-engaged**, making triage easier and improving reporting around user involvement.

---

## 🚀 Features

- ✅ Automatically applies a tag when a caller comments on their incident
- ✅ Removes the tag if a fulfiller or agent responds instead
- ✅ Designed to work with the `label_entry` tagging system
- ✅ Supports triage dashboards, agent alerting, and caller response tracking
- ✅ Runs on the `incident` table

---

## 📄 Script: `code.js`

```javascript
// Business Rule: After Update on Incident table
// Condition: Changes to Additional Comments field
// Purpose: Add or remove a tag based on whether the update was made by the caller

(function executeRule(current, previous /*null when async*/) {

    var TAG_SYS_ID = '<sys_id_of_the_Tag>'; // Replace with actual Tag sys_id
    var callerUsername = current.caller_id.user_name;
    var updatedBy = current.sys_updated_by;

    if (updatedBy == callerUsername) {
        // Add tag if caller added the comment
        var tagGR = new GlideRecord('label_entry');
        tagGR.addQuery('label', TAG_SYS_ID);
        tagGR.addQuery('table_key', current.sys_id);
        tagGR.query();

        if (!tagGR.hasNext()) {
            var addTag = new GlideRecord('label_entry');
            addTag.initialize();
            addTag.label = TAG_SYS_ID;
            addTag.table = 'incident';
            addTag.table_key = current.sys_id;
            addTag.insert();
        }
    } else {
        // Remove tag if someone else (e.g., fulfiller) responded
        var removeTag = new GlideRecord('label_entry');
        removeTag.addQuery('label', TAG_SYS_ID);
        removeTag.addQuery('table_key', current.sys_id);
        removeTag.query();

        while (removeTag.next()) {
            removeTag.deleteRecord();
        }
    }

})();

🛠️ How to Use

1) Create a new Business Rule on the incident table.
2) Set the rule to run:
    When: After
    Update: True
    Condition: current.comments.changes() (Additional Comments field)
3) Paste the script above into the Script field.
4) Replace <sys_id_of_the_Tag> with the actual sys_id of the tag you want to use (e.g., “Caller Responded”).

📸 Example Use Case

1) A user (caller) replies to an incident via the portal — a tag like “Caller Responded” is automatically added.
2) An agent follows up on the ticket — the tag is removed, indicating the latest activity is from internal staff.
3) Dashboards or work queues can filter based on presence/absence of this tag.

📂 File Structure

Server-Side Components/
└── Business Rules/
    └── Caller Comment Tagging/
        ├── README.md
        └── code.js

⚙️ Requirements

1) A tag must already exist in the label table.
2) Create one manually (e.g., "Caller Responded") and copy its sys_id.
3) Works on instances with label_entry functionality (standard in most modern ServiceNow versions)


✅ Contribution Checklist Compliance

✔️ Code placed under the correct category/subcategory
✔️ README.md included with purpose, usage, and file structure
✔️ No XML or system export files included
✔️ Script is relevant to real-world ServiceNow developer use cases
✔️ Uses native GlideRecord APIs and best practices

👨‍💻 Author

Contributor: @Shweyy123
Pull Request: Pending
Script Name: code.js — Caller-Initiated Comment Tagging

📘 License

This script is provided for educational and developmental use. Always test in a sub-production environment before applying in production.

🧩 Optional Enhancements

1) Add condition to check if the comment contains certain keywords
2) Track tags per user type (e.g., customer vs internal employee)
3) Integrate with notifications to alert when caller responds
