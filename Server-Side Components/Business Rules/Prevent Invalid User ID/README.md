
#  Prevent Invalid User ID

## Overview
This **ServiceNow Business Rule** prevents inserting or updating a record when:
- `user_name` is missing or invalid.
- Both `first_name` and `last_name` are missing or invalid.

## Functionality Breakdown

### 1. `isInvalid(value)`
- Detects invalid values in user fields.
- Returns `true` if:
  - Value is `null`, `undefined`, or empty (`""`)
  - Value (after trimming spaces and lowering case) equals `"null"`

Example:
```javascript
isInvalid(null);        // true
isInvalid("");          // true
isInvalid("NULL");      // true
isInvalid("john");      // false
```

### 2. `current.setAbortAction(true)`
- Stops the record from being inserted or updated.
- Used inside **Before Business Rules**.
- Prevents saving invalid data to the database.

### 3. `gs.addErrorMessage("...")`
- Displays a user-friendly error message at the top of the form.
- Helps users understand *why* the save was blocked.


##  Notes
- Case-insensitive — handles "null", "NULL", "Null", etc.  
- Works best in **Before Business Rules** to stop invalid data before saving.  
- Adding `gs.addErrorMessage()` helps users understand the validation reason.

