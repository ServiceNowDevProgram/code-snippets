function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    
    var todayDate = new Date();
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    
    var todayDateStr = formatDate(todayDate, g_user_date_format);
    var futureDateStr = formatDate(futureDate, g_user_date_format);
    
    var selectedDateNum = getDateFromFormat(newValue, g_user_date_format);
    var todayDateNum = getDateFromFormat(todayDateStr, g_user_date_format);
    var futureDateNum = getDateFromFormat(futureDateStr, g_user_date_format);
    
    if (selectedDateNum < todayDateNum || selectedDateNum > futureDateNum) {
        g_form.showFieldMsg(control, 'Date must be between today and 30 days from today', 'error');
        g_form.clearValue(control);
    } else {
        g_form.hideFieldMsg(control);
    }
}
