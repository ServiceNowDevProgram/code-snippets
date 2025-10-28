# BackFillAssignmentGroup

This script include is an advanced reference qualifier for the Assignment group field. It restricts the Assignment group choices to only relevant groups of which the current Assigned to user is a member.

## Current Configuration

The script include filters for groups with the OOTB **type** of "itil" assigned to them (generally considered fulfiller groups). As such, it's ideal for use on the base Task and its extended tables (Incident, Problem, Change). Note that the **type** field is a list and the values should be queried by sys_id. It would be simple to modify the script to constrain the field to different roles or other attribute.

## Use

1. Create a script include called **BackfillAssignmentGroup**.
2. Set **Accessible from** to **This application scope only**.
3. Add description **Links assignment group field to assigned to field so that only the groups of which the assigned to is a member will be displayed for selection.** or write your own.
4. Paste the entire contents of the script file into the **Script** field.
5. Save.

Configure the dictionary entry of the assignment_group field on Task table.

1. Type **task.list** into the navigator and press **Enter**.
2. Right-click any column name and select **Configure>Table**.
3. Select **Advanced View** under **Related Links** if not already.
4. Under the **Reference Specification** tab, set **Use reference qualifier** to **Advanced**.
5. In the **Reference qual** field, enter: **javascript:new BackfillAssignmentGroup().BackfillAssignmentGroup()**
6. Save
