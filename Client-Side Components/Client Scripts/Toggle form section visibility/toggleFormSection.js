// Client Script to Toggle Form Section Visibility

function toggleFormSection() {
    var checkboxField = g_form.getControl('checkbox_field'); // Replace 'checkbox_field' with your field name
    var section = gel('section_id'); // Replace 'section_id' with the ID of the section to toggle

    if (checkboxField.checked) {
        section.style.display = 'block'; // Show the section when the checkbox is checked
    } else {
        section.style.display = 'none'; // Hide the section when the checkbox is unchecked
    }
}

// Attach the toggleFormSection function to the checkbox field's change event
g_form.observe('change', 'checkbox_field', toggleFormSection);
