# ServiceNow UI Macro: Copy Field to Clipboard

This ServiceNow UI Macro allows you to easily copy field values to your clipboard by clicking on the button next to the field. It supports both standard fields and reference fields.

## Usage

1. Install the UI Macro:
   - Navigate to **System UI** > **UI Macros**.
   - Create a new UI Macro.
   - Paste the XML code of the UI Macro into the script field.
   - Save the UI Macro.

2. Add the UI Macro to a Form:
   - Navigate to the form where you want to add the copy functionality.
   - Right-Click on the field you want this UI macro to be attached to.
   - Add/Modify the following attribute 'ref_contributions=<NAME_OF_UI_MACRO>'
   - (OPTIONAL) Use semicolon to separate UI macros in field attributes like this 'ref_contributions=<UI_MACRO_1>;<UI_MACRO_2>'.

3. Copy Field Value:
   - When viewing a record with the UI Macro added, you'll see a "Copy to Clipboard" icon next to the field.
   - Click the "Copy to Clipboard" icon to copy the field value to Clipboard.

## Supported Fields

- **Standard Fields**: You can use this UI Macro to copy values from standard fields on the form.
- **Reference Fields**: This UI Macro also supports copying sys_ids of reference fields.
