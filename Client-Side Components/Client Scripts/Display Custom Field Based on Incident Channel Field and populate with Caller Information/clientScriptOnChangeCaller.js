function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var ga = new GlideAjax('CallerInfoHelper');
    ga.addParam('sysparm_name', 'getCallerInfo');
    ga.addParam('sysparm_caller', newValue);

    ga.getXMLAnswer(function(answer) {
        // Confirm what you’re actually receiving
        console.log("GlideAjax raw answer:", answer);

        if (!answer) return;

        var info;
        try {
            info = JSON.parse(answer);
        } catch (e) {
            console.log("Error parsing JSON:", e);
            return;
        }

        g_form.setValue('u_email', info.email || '');
        g_form.setValue('u_phone', info.mobile || '');

    });
}
