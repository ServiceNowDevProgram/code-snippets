#  Auto-Populate Manager Field Based on Selected User

##  Description
This catalog client script automatically fills the **Manager** field when a user is selected in a Service Catalog item. It uses a client-callable Script Include to fetch the manager of the selected user from the `sys_user` table.

##  Files Included
- `ClientScript_AutoPopulateManager.js`
- `ScriptInclude_GetManager.js`

##  Use Case
Improves user experience by reducing manual input and ensuring accurate manager data in catalog requests.

##  Setup Instructions
1. Create a **Catalog Client Script** on the relevant catalog item.
2. Add the provided JavaScript to the `onChange` function of the `user` field.
3. Create a **Script Include** named `GetManager` and mark it as client-callable.
4. Ensure the catalog item has a `manager` field to populate.

