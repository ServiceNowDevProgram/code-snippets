# Copy SysIDs in Bulk — ServiceNow Utility

> Simplify copying checked sys_ids from a list view with a one-click UI Action.  

---

## Purpose / Use Case

Often, you may need to extract sys_ids from records listed in a ServiceNow list view (for scripting, validations, data workflows, etc.). Instead of exporting CSVs or manually gathering IDs, this utility enables direct copying of the selected records’ sys_ids (comma-separated) from the list itself.

---

## How It Works

It adds a global UI Action (on lists) that, when clicked, collects the sys_ids of checked records and copies them to the clipboard using a small client-side script.

---

## Installation Steps

1. Navigate to **System Definition > UI Actions**.
2. Create a **new UI Action** with these settings:
   - **Name**: e.g. `Copy Bulk SysIDs`
   - **Table**: `Global` (so it works on every list)
   - **Check** the **Client** and **List** checkboxes (so it appears in list context on client side)  
3. In the **Onclick / Client script** field, paste:

   ```javascript
   var sysIds = g_list.getChecked();
   copyToClipboard(sysIds);

## Result
<img width="1829" height="901" alt="image" src="https://github.com/user-attachments/assets/bdbd7c11-9a1a-42a3-972e-6920228fe065" />
