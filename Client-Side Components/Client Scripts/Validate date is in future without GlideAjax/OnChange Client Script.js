/*
    Client script that validates a date is in future without the need of a GlideAjax and Script Include
*/

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    var fieldToValidate = '<your_field_name>'

    var currentDate = formatDate(new Date(), g_user_date_format);
    var currentDateInMs = getDateFromFormat(currentDate, g_user_date_format);
    var dateToValidateInMs = getDateFromFormat(g_form.getValue(fieldToValidate), g_user_date_format);

    if (dateToValidateInMs <= currentDateInMs) {
        g_form.showFieldMsg(fieldToValidate, "Enter a valid future date.", 'error');
        return false;
    }
}