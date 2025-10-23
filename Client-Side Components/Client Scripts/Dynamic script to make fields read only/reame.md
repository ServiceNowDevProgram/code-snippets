Dynamic script to make fields read only

It runs when the field value changes.On change client script
If the new value equals '7', it retrieves all editable fields using g_form.getEditableFields().
Then it loops through each field and sets it to read-only using g_form.setReadOnly().
