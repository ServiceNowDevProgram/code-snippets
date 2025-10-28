# Special Characters Validation (onChange Client Script)

This script validates user input in a specific field and prevents the use of disallowed special characters.  
It is designed to run as an **onChange client script** .

## Functionality

- When the user changes the value of a field, the script checks if the new value contains any special characters.
- If disallowed characters are found, the field is cleared and an error message is displayed to the user.
- The validation uses a regular expression that includes common special characters such as `~`, `@`, `|`, `$`, `^`, `<`, `>`, `*`, `+`, `=`, `;`, `?`, `` ` ``, `'`, `(`, `)`, `[`, and `]`.

## How to Use

1. Add the script as an **onChange client script** on the field you want to validate.
2. Replace the placeholder `'<your_field_name>'` in the script with the actual field name.
3. Customize the regular expression if you want to allow or block different characters.

## Example Behavior

- Input: `Hello@World` → ❌ Invalid → Field is cleared, error message shown.
- Input: `HelloWorld` → ✅ Valid → No action taken.

## Notes

- The script uses `g_form.clearValue()` to reset the field and `g_form.showErrorBox()` to display feedback.

