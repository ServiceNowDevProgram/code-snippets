function onChange(control, oldValue, newValue, isLoading, isTemplate) {

    //Return if page is loading or new value of e-mail is empty
    if (isLoading || newValue === '') {
        return;
    }

    //Make Ajax call to check if e-mail already exists in sys_user table
    var ga = new GlideAjax('user_CheckEmail'); //user_CheckEmail - Script Include name
    ga.addParam('sysparm_name', 'validateEmail'); //sysparm_name - Parameter with function name in Script Include
    ga.addParam('sysparm_emailString', newValue); //sysparm_emailString - Parameter with new value of e-mail 
    ga.getXMLAnswer(verifyDuplicates); //verifyDuplicates - Name of asynchronous callback function 

    //Asynchronous callback function to process response
    function verifyDuplicates(response) {

        //If repsonse is not null (in case if e-mail was not find)
        if (response) {

            //Parse response and show message about found duplicate
            var data = JSON.parse(response);
            g_form.showFieldMsg('email', 'User with that e-mail already exists: ' + data.name + '(' + data.sys_id + ')', 'error');
        }
    }
}
