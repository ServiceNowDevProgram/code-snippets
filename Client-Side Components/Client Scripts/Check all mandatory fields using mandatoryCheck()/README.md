# Mandatory Field Check on Form Change

This client script demonstrates how to use `g_form.mandatoryCheck()` to validate whether all mandatory fields on a form are filled.

It is typically used in an **onChange** catalog client script to trigger validation when a specific field changes.

If mandatory fields are missing, the script:
- Displays an info message listing the missing fields. Note: the red message is the existing functionality that will give you an error message.
- Visually highlights each missing field using a flashing effect to guide the user.

This approach improves user experience by clearly indicating which fields require attention.

**Example configuration**
<img width="1122" height="638" alt="image" src="https://github.com/user-attachments/assets/31f86ae7-27fe-4921-8d8b-391eaa55304d" />

**Example execution**
<img width="1029" height="495" alt="image" src="https://github.com/user-attachments/assets/b8384507-4292-41f4-9155-9be10195493e" />
