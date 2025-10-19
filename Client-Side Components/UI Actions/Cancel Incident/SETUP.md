# Setup Instructions for Cancel Incident UI Action

This document provides detailed step-by-step instructions for implementing the Cancel Incident UI Action in your ServiceNow instance.

## Prerequisites

- Administrative access to ServiceNow instance
- Access to System Definition > UI Actions module
- Understanding of ServiceNow UI Actions and client-server scripting

## Step-by-Step Setup

### 1. Navigate to UI Actions

1. In ServiceNow, go to **System Definition > UI Actions**
2. Click **New** to create a new UI Action

### 2. Configure Basic Settings

Fill in the following fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Cancel Incident | Display name for the UI Action |
| **Table** | Incident [incident] | Target table for the UI Action |
| **Action name** | cancel_incident | Unique identifier for the action |
| **Active** | ✓ (checked) | Enables the UI Action |

### 3. Configure Display Settings

| Field | Value | Description |
|-------|-------|-------------|
| **Form button** | ✓ (checked) | Shows button on form view |
| **Form link** | ☐ (unchecked) | Optional: Show as link instead |
| **List banner button** | ☐ (unchecked) | Not needed for this action |
| **List choice** | ☐ (unchecked) | Not needed for this action |

### 4. Configure Client Settings

| Field | Value | Description |
|-------|-------|-------------|
| **Client** | ✓ (checked) | Enables client-side execution |
| **Onclick** | `cancelIncident();` | Client-side function to call |

### 5. Configure Conditions

| Field | Value | Description |
|-------|-------|-------------|
| **Condition** | `current.state == '1'` | Only show for "New" incidents |

### 6. Add the Script

Copy the entire content from `script.js` and paste it into the **Script** field of the UI Action.

### 7. Configure Advanced Settings (Optional)

| Field | Value | Description |
|-------|-------|-------------|
| **Order** | 100 | Display order (adjust as needed) |
| **Hint** | Cancel this incident | Tooltip text |
| **Comments** | UI Action to cancel incidents in New state | Internal documentation |

## Verification Steps

### 1. Test the UI Action

1. Navigate to an incident in "New" state
2. Verify the "Cancel Incident" button appears
3. Click the button and confirm the modal appears
4. Test both "OK" and "Cancel" in the confirmation dialog

### 2. Verify State Changes

1. After confirming cancellation, check that:
   - Incident state changes to "Cancelled"
   - Work notes are added with cancellation details
   - Success message appears

### 3. Test Edge Cases

1. Try accessing the UI Action on incidents in other states (should not appear)
2. Test with different user roles to ensure proper permissions
3. Verify error handling works correctly

## Troubleshooting

### Common Issues

**UI Action doesn't appear:**
- Check that the incident is in "New" state (state = 1)
- Verify the condition field: `current.state == '1'`
- Ensure the UI Action is marked as Active

**Script errors:**
- Check browser console for JavaScript errors
- Verify the script is properly copied from `script.js`
- Ensure proper syntax and formatting

**Permission issues:**
- Verify user has write access to incident table
- Check ACL rules for incident cancellation
- Ensure proper role assignments

### Debug Mode

To enable debug logging, add this line at the beginning of the `serverCancel()` function:

```javascript
gs.info('Debug: Starting incident cancellation for ' + current.number);
```

## Security Considerations

- The UI Action respects existing ACL rules
- Only users with incident write permissions can cancel incidents
- All cancellations are logged for audit purposes
- Work notes provide cancellation history

## Customization Options

### Modify Confirmation Message

Edit line 33 in the script to customize the confirmation dialog:

```javascript
gm.setPreference("question", "Your custom message here");
```

### Change Cancellation Reason

Modify the work note in the `serverCancel()` function (line 79):

```javascript
var workNote = 'Custom cancellation reason: ' + gs.getUserDisplayName() + ' on ' + gs.nowDateTime();
```

### Add Additional Validations

Add custom validation logic in the `cancelIncident()` function before showing the modal.

## Support

For issues or questions:
1. Check ServiceNow system logs
2. Review browser console for client-side errors
3. Test in a development instance first
4. Consult ServiceNow documentation for UI Actions
