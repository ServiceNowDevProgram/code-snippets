# Add "Copy Field Name, Value, Display Value" to context menu for list records

Add context menu options allowing for admins to be able to right click a record's field in the list view and choose "Copy Field Name", "Copy Field Value", and "Copy Field Display Value" to quickly get the column variable name and values to their clipboard.

## Setting up

- Create a script include and copy the .js file. Set it as `Client callable = true`
- Create sys_ui_context_menu (Context Menu) records, one each for:
    - Copy Field Value
    - Copy Field Name
    - Copy Field Display Value

## Context Menu records configuration

- Table: Global [global]
- Menu: List row
- Type: Action
- Name: Copy Field Value
- Order: Use 51, 52, and 53
- Acive: True
- Run onShow script: False
- Condition: `gs.hasRightsTo("ui/context_menu.copy_sysid/read", null)`
- Action Script: see .js files in this folder for each one