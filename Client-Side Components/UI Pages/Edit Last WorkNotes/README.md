# ✏️ Edit Last Work Notes or Comments via Modal (Client UI Action)

## 📁 Location  
**Category:** `Client-Side Components`  
**Subcategory:** `UI Actions`  
**Snippet Folder:** `Edit Last Comments Modal`

---

## 📌 Description

This client-side function enables inline editing of the **most recent Work Notes or Additional Comments** on an Incident record via a modal dialog—without navigating away from the form.

When triggered from a **UI Action**, it opens a modal powered by the **UI Macro** `edit_worknotes_comments_inc`, passing the current record’s `sys_id` to enable dynamic data loading and editing.

---

## 🚀 Features

- 🪟 Opens a modal dialog using `GlideModal`
- ✏️ Allows quick editing of the latest Work Notes or Additional Comments
- 🔄 Passes the current Incident `sys_id` to the UI macro using `setPreference()`
- 🎨 Sets modal width and title for a better user experience
- 🧩 Seamlessly integrates into the form via a client-side UI Action

---

## 🧪 Example Use Case

Imagine a fulfiller needs to quickly revise their most recent comment on a ticket. Instead of scrolling through activity logs or editing the full record, they simply:

1. Click the **“Edit Last Comment”** button on the form.
2. A modal opens, pre-populated with the last comment.
3. They update and save — without navigating away from the current form.

---

## 📄 Script: `UIAction.js`

```javascript
/**
 * Opens a modal to edit the last Work Notes or Additional Comments.
 *
 * Usage:
 * - UI Action: Client = true
 * - OnClick: openEditLastCommentModal()
 * - Form Button: true
 */
function openEditLastCommentModal() {
    var dialog = new GlideModal("edit_worknotes_comments_inc");
    dialog.setTitle("Edit Last WorkNotes/Additional Comments");
    dialog.setPreference("incid", g_form.getUniqueValue());
    dialog.setWidth(550);
    dialog.render();
}

🛠️ How to Use

1) Create a UI Action on the incident table with the following settings:
    Client: true
    Form Button: true
    OnClick: openEditLastCommentModal()

2) Add the above function to a client script file or ensure it is loaded with the UI Action.
3) Ensure a corresponding UI Macro (edit_worknotes_comments_inc) exists that supports editing based on the provided sys_id.

📂 File Structure

Client-Side Components/
└── UI Actions/
    └── Edit Last Comments Modal/
        ├── README.md
        └── UIAction.js

📘 Dependencies

1) A working UI Macro named edit_worknotes_comments_inc that accepts the incid preference.
2) GlideModal API must be available on the form (standard in UI16+).
3) Script must run on a form context (g_form).

✅ Contribution Checklist Compliance

✔️ Code placed under correct category (Client-Side Components/UI Actions)
✔️ README.md provided with description and usage
✔️ Code snippet is self-contained and relevant to ServiceNow developers
✔️ No XML or server-specific exports included
✔️ Uses modern, maintainable JavaScript practices

👤 Author

Contributor: @Shweyy123
Script Name: UIAction.js — Open Modal for Editing Last Comments
PR Title: Added modal function to edit last Work Notes or Comments

📘 License

This script is shared for educational and developmental use. Test thoroughly in non-production environments before implementation.

🧩 Optional Enhancements

1) Extend to support both Work Notes and Additional Comments with tab-based UI
2) Add history tracking or audit log of modal-based edits
3) Support additional tables like change_request or problem
