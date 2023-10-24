## Overview
To be used within an action to copy an attachment record from one record to another

## Inputs
Pass in the following to the action:
- **Originating table** - table that hosts the record from which you want to copy attachments
- **Originating record sys_id** - sys_id of the record that the attachments are associated with
- **New table**  - table of the record that you want to copy attachments to
- **New record sys_id** - sys_id of the record that you want to copy the attachments to

## Script Step
Create a script step with the code provided in **CopyAttachments.js**
