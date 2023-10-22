# Make Number Field Read-Only Script

Do you find it frustrating that the number field is not read-only by default on new tables? When creating a custom table extending from a task, the number field is, by default, editable. There's almost no reason why this field should not be set to read-only by default!

This script action addresses the issue. It will perform the following actions every time you create a new custom table extending from a task:

- Sets the number field to read-only
- Removes the default ITIL reference qualifier from assigned_to and assignment_group and sets only "active=true"
