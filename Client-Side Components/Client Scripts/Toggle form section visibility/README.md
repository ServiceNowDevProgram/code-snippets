
# Toggle Form Section Visibility Client Script

## Overview

This client script enhances the user experience in ServiceNow by providing a dynamic way to toggle the visibility of a form section based on the state of a checkbox or switch field. It simplifies complex forms and allows users to control which sections they want to view, making the form more user-friendly.

## How It Works

When a user interacts with the designated checkbox field, the corresponding form section is either displayed or hidden in real-time. This behavior improves form navigation and streamlines the user experience.

### Configuration

To use this client script in your ServiceNow instance, follow these steps:

1. **Create a Client Script:**

   - Log in to your ServiceNow instance as an admin or developer.
   - Navigate to "System Definition" > "Client Scripts."
   - Create a new client script and provide it with a meaningful name (e.g., "Toggle Section Visibility").

2. **Copy and Paste the Script:**

   - Copy the JavaScript code provided in this README.
   - Paste the code into your newly created client script.

3. **Customize Field and Section:**

   - Modify the script to specify the checkbox field that triggers the visibility toggle and the ID of the section you want to control.

4. **Activate and Test:**

   - Save and activate the client script.
   - Test the functionality by creating or editing a form with the designated checkbox and section.

## Example Usage

Imagine you have a form with a checkbox labeled "Show Additional Details." When users check this box, the "Additional Details" section of the form becomes visible, and when unchecked, it is hidden. This feature simplifies long forms and allows users to focus on the information that matters to them.

## Benefits

- Improves user experience by offering dynamic form sections.
- Simplifies complex forms, making them more user-friendly.
- Enhances form navigation and efficiency.
- Reduces clutter on forms and improves user satisfaction.

## Code Explanation

- The toggleFormSection function is defined to be executed when the checkbox field changes.
- It retrieves the checkbox field's control and the section's HTML element by their respective IDs.
- When the checkbox is checked (checkboxField.checked is true), it sets the section's display style property to 'block', making the section visible.
- When the checkbox is unchecked, it sets the section's display property to 'none', hiding the section.
- The g_form.observe method attaches the toggleFormSection function to the change event of the checkbox field, so it triggers whenever the checkbox state changes.