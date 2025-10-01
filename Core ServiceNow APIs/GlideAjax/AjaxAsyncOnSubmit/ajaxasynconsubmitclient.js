function onSubmit() {
    //Only submit if submitForm is flagged as true
    if (g_scratchpad.submitForm)
        return true;

    var user = g_user.userID;
    var ga = new GlideAjax('UserUtils');
    ga.addParam('sysparm_name', 'getUserInfo');
    ga.addParam('sysparm_user', user);
    ga.getXMLAnswer(function getAnswer(answer) {
        if (answer == 'false') {
            g_form.addErrorMessage('User is not a VIP, Cant proceed');
            return false;
        }
        //Allow force submission upon receiving a response
        var actionName = g_form.getActionName();
        g_scratchpad.submitForm = true;
        g_form.submit(actionName);
    });

    //Do not submit initially and force to wait for response from the asynchronous GlideAjax call
    return false;
}
