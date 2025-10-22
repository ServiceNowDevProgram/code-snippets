## Add on Submission Email Validation for Catalog Items

### Summary
Implements onSubmit email validation client script that prevents incorrect email entries from being submitted when a user submits a catalog item.

### Changes
- **onSubmit Validation Script**: Email format validated during catalog item submission.
- **Dedicated README**: Implementation guide for catalog form submission validation.

### Features
- Prevents form submission if email format is invalid
- Dynamic error/success messages
- Uses regex pattern for standard email format
- Lightweight and fully client-side — no server calls

### User Experience
- **Invalid email**: Red error message with example format
- **Valid email**: Form submission proceeds normally
- **Empty field**: No validation triggered
- Reduces user frustration on submission

### Benefits
- Ensures only valid email addresses are submitted
- Errors corrected before form submission
- Better data quality in catalog requests
- Reduces form abandonment rates

### Testing Checklist
- [ ] Valid email formats proceed with form submission normally
- [ ] Invalid formats display error message
- [ ] Messages clear dynamically on input change
- [ ] No validation during form load
- [ ] Empty fields handled correctly

### Setup
Replace `'email_field_name'` with actual variable name in script before deployment.
