/*
Type: onChange
Field: a reference to the User table
*/
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    var test = newValue;

    //The Script Include called here can be found in:
    //Server-Side Components / Script Includes / Get User Data by Id
    //It is in Global scope 
    var ga = new GlideAjax('GetUserData');//script include name
    ga.addParam('sysparm_name', 'GetUserBy_id'); //method to be called
    ga.addParam('sysparm_userid', test); //send a parameter to the method.
    ga.getXMLAnswer(userInfoParse);

    function userInfoParse(response) {
        if (response == '') {
            g_form.addErrorMessage('User not found with the informed sys_id.');
        } else {
            //alert(response);
            var obj = JSON.parse(response);
            g_form.setValue('u_first_name', obj.first_name.toString());
            g_form.setValue('u_last_name', obj.last_name.toString());
            g_form.setValue('u_email', obj.email.toString());
        }

    }

}
