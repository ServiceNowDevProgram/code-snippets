 var shortDescription = g_form.getValue('short_description');
    if (shortDescription.length < 10) {
      alert('There should be a minimum of 10 charecters in Short Description.');
        return false; // Prevent submitting the form.
    }
    return true; // Allows submission.
