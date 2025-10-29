# Form Dirty State Prevention

## Overview
Detects form changes and warns users before navigating away or closing the form, preventing accidental data loss.

## What It Does
- Tracks form field changes (dirty state)
- Warns user before leaving unsaved form
- Allows user to cancel navigation
- Works with all form fields
- Prevents accidental data loss
- Clean, reusable pattern

## Use Cases
- Complex multi-field forms
- Long data entry forms
- Forms with expensive operations
- Critical data entry (financial, medical)
- Any form where accidental exit would cause issues

## Files
- `form_dirty_state_manager.js` - Client Script to manage form state

## How to Use

### Step 1: Create Client Script
1. Go to **System Definition > Scripts** (any table)
2. Create new Client Script
3. Set **Type** to "onChange"
4. Copy code from `form_dirty_state_manager.js`
5. Set to run on any field

### Step 2: Add Navigation Handler
1. Add to form's onLoad script:
```javascript
// Initialize dirty state tracking
var formStateManager = new FormDirtyStateManager();
```

### Step 3: Test
1. Open form and make changes
2. Try to navigate away without saving
3. User sees warning dialog
4. User can choose to stay or leave

## Example Usage
```javascript
// Automatically tracks all field changes
// When user tries to close/navigate:
// "You have unsaved changes. Do you want to leave?"
// - Leave (discard changes)
// - Stay (return to form)
```

## Key Features
- ✅ Detects any field change
- ✅ Persistent across form interactions
- ✅ Works with new records and updates
- ✅ Ignores read-only fields
- ✅ Resets after save
- ✅ No performance impact

## Output Examples
```
User opens form and changes a field
→ Form marked as "dirty"

User clicks close/back button
→ Warning dialog appears: "You have unsaved changes"

User clicks Leave
→ Form closes, changes discarded

User clicks Save then navigates
→ No warning (form is clean)
```

## Customization
```javascript
// Customize warning message
var warningMessage = "Warning: You have unsaved changes!";

// Add specific field tracking
g_form.addOnFieldChange('priority', myCustomHandler);

// Reset dirty flag after save
g_form.save(); // Automatically triggers cleanup
```

## Requirements
- ServiceNow instance
- Client Script access
- Any table form

## Browser Support
- Chrome, Firefox, Safari, Edge (all modern browsers)
- Works with ServiceNow classic and modern UI

## Related APIs
- [g_form API](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_FormAPI.html)
- [Client Script Events](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_ClientScriptEvents.html)
- [Form Field Changes](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_FieldChanges.html)

## Best Practices
- Apply to important data entry forms
- Test with real users
- Consider accessibility for screen readers
- Use with save shortcuts (Ctrl+S)
- Combine with auto-save patterns
