# Clear all fields on a catalog item form

This function clears all editable fields on a form, except those explicitly excluded.  
It works on both the native platform (Classic UI) and Service Portal / Mobile.  
Typically used with an OnChange catalog client script when you want to clear all fields after a certain variable changes.

The function returns an array of the field names that were cleared, which can be used for logging or further processing.

### Exclusion Support

You can pass an array of field names to exclude from being cleared.  
This is useful when you want to preserve the value of the field that triggered the change or other important fields.

### Example
```
clearFields(['short_description', 'priority']);
```
// Clears all fields except 'short_description' and 'priority'
