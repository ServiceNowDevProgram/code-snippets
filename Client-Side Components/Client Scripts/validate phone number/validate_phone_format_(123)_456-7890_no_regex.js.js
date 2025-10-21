function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || !newValue) return;

    var fieldName = control.name;

    // Split the string
    var area = newValue.substring(1, 4);
    var firstThree = newValue.substring(6, 9);
    var lastFour = newValue.substring(10, 14);

    if (
        newValue[0] !== '(' || newValue[4] !== ')' || newValue[5] !== ' ' || newValue[9] !== '-' ||
        isNaN(parseInt(area)) || isNaN(parseInt(firstThree)) || isNaN(parseInt(lastFour))
    ) {
        g_form.showFieldMsg(
                fieldName,
                'Phone Number must be in the format (123) 456-7890',
                'error',
                false
            );
        g_form.setValue(fieldName, '');
    }
}
