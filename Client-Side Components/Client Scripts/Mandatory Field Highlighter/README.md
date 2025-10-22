# Mandatory Field Highlighter

## Use Case
Provides visual feedback for empty mandatory fields on ServiceNow forms by showing error messages when the form loads. Helps users quickly identify which required fields need to be completed.

## Requirements
- ServiceNow instance
- Client Script execution rights
- Forms with mandatory fields

## Implementation
1. Create a new Client Script with Type "onLoad"
2. Copy the script code from script.js
3. **Customize the fieldsToCheck string** with your form's mandatory field names
4. Apply to desired table/form
5. Save and test on a form with mandatory fields

## Configuration
Edit the `fieldsToCheck` variable to include your form's mandatory fields as a comma-separated string:

```javascript
// Example configurations for different forms:

// For Incident forms:
var fieldsToCheck = 'short_description,priority,category,caller_id,assignment_group';

// For Request forms:
var fieldsToCheck = 'short_description,requested_for,category,priority';

// For Change Request forms:
var fieldsToCheck = 'short_description,category,priority,assignment_group,start_date,end_date';

// For Problem forms:
var fieldsToCheck = 'short_description,category,priority,assignment_group';

// Custom fields (add as needed):
var fieldsToCheck = 'short_description,priority,u_business_justification,u_cost_center';
```

## Features
- Shows error messages under empty mandatory fields on form load
- Easy configuration with comma-separated field names
- Automatically skips fields that don't exist on the form
- Only processes fields that are actually mandatory and visible
- Uses proper ServiceNow client scripting APIs
- No DOM manipulation or unsupported methods

## Common Field Names
- `short_description` - Short Description
- `priority` - Priority
- `category` - Category  
- `caller_id` - Caller
- `requested_for` - Requested For
- `assignment_group` - Assignment Group
- `assigned_to` - Assigned To
- `state` - State
- `urgency` - Urgency
- `impact` - Impact
- `start_date` - Start Date
- `end_date` - End Date
- `due_date` - Due Date
- `location` - Location
- `company` - Company
- `department` - Department

## Notes
- Uses g_form.showFieldMsg() method to display error messages
- Uses g_form.hasField() to safely check field existence (built into the safety checks)
- Only runs on form load - provides initial validation feedback
- Easy to customize for different forms by modifying the field list
- Compatible with all standard ServiceNow forms
- Lightweight and focused on essential functionality

## Example Usage
For a typical incident form, simply change the configuration line to:
```javascript
var fieldsToCheck = 'short_description,priority,category,caller_id,assignment_group';
```
Save the Client Script and test on an incident form to see error messages appear under empty mandatory fields.