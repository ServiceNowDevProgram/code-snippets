(function executeRule(current, previous /*null when async*/ ) {

    //[u_email_address],this field backend value needs to be replaced with the email field in which you want to implement the business rule.
    //Example: In the [sys_user] table, the field will be 'email'
        
    var getEmail = current.u_email_address;

    if (/\s/.test(getEmail)) {
        current.u_email_address = getEmail.trim().replace(/\s/g, '');
        getEmail.update();
    }
})(current, previous);
