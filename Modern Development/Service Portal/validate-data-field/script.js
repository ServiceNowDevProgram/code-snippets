//Catalog Client Script
function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {
        g_form.hideFieldMsg('project_deadline', true);
        return;
    }

    //If the Project Deadline is in the past, show error message
    var deadlineDate = new Date(getDateFromFormat(newValue, g_user_date_format));
    var nowDate = new Date();

    if (nowDate.getTime() >= deadlineDate.getTime()) {

        g_form.setValue('project_deadline', '');
        g_form.showErrorBox('project_deadline', 'Project deadline should be after today', true);

    } else {

        g_form.hideFieldMsg('project_deadline', true);

    }

}