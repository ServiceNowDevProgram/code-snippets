function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

    // Check if all mandatory fields are filled
    if (!g_form.mandatoryCheck()) {
        //if not get all missing fields
        var missing = g_form.getMissingFields();
        //Info message displaying the fields that are missing
        g_form.addInfoMessage("Please complete the following mandatory fields: " + missing.join(", "));
        //go through missing fields and flash them
        missing.forEach(function (fieldName) {
            g_form.flash(fieldName, "#FFFACD",0); // Flash to draw attention
        });
    }
}
