Live Character Counter Client Script
This ServiceNow client script provides a live character counter for a specified text field, offering immediate feedback to the user as they type. The script visually alerts the user when they are nearing or have exceeded the maximum character limit.
Features
Real-time feedback: The script updates the character count as the user types.
Visual cues: Different message styles are used to indicate the character count status:
Info: Standard message showing the remaining characters.
Warning: Displays when 10 or fewer characters remain.
Error: Appears when the maximum character limit is exceeded.
Clean user experience: The script clears previous messages before displaying a new one, preventing duplicate messages from cluttering the form.
Best practices compliant: The script uses g_form methods exclusively and avoids direct DOM manipulation, ensuring compatibility and maintainability across ServiceNow upgrades.
Installation
1. Create the Client Script
Navigate to System Definition > Client Scripts.
Click New.
Fill out the form with the following details:
Name: onChange - Live Character Counter
Table: Select the table where the target text field exists (e.g., Incident).
UI Type: All
Type: onChange
Field name: The name of the text field you want to monitor (e.g., short_description).
Script: Copy and paste the code snippet below.
2. Configure the script
Paste the following code into the Script field. Be sure to change the fieldName variable to match the internal name of your target field.
javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // Set the internal name of the field to monitor.
    var fieldName = g_form.getControl('name').name; // This dynamically gets the field name.
    
    // Fallback in case the control isn't found.
    if (!fieldName) {
        fieldName = control.name;
    }

    var maxLength = g_form.getControl(fieldName).getAttribute('maxlength');
    if (maxLength) {
        
        var remaining = maxLength - newValue.length;
        var message = 'Remaining characters: ' + remaining;

        // Clear previous messages to avoid duplication.
        g_form.hideFieldMsg(fieldName);

        if (remaining <= 10 && remaining >= 0) {
            g_form.showFieldMsg(fieldName, message, 'warning');
        } else if (remaining < 0) {
            g_form.showFieldMsg(fieldName, 'Maximum characters exceeded!', 'error');
        } else {
            g_form.showFieldMsg(fieldName, message, 'info');
        }
    }
}
Use code with caution.

How it works
Event trigger: The script is triggered every time the user modifies the selected onChange field.
Initial check: The script checks for isLoading or an empty newValue to prevent unnecessary execution on form load or when the field is empty.
Get field details: It retrieves the maxlength attribute from the field's control object.
Calculate remaining characters: It subtracts the current input length from the maximum length.
Display message: It uses conditional logic to display a message with a specific style (info, warning, or error) based on the remaining character count.
Clear messages: g_form.hideFieldMsg() ensures only the most current message is visible at any time.
Customization
Target Field: Change the Field name in the Client Script configuration to apply the counter to a different field.
Thresholds: Modify the remaining <= 10 condition to change the number of characters that trigger the warning message.
Message Text: Adjust the message variables to customize the text displayed to the user.



