(function executeRule(current, previous /*null when async*/ ) {

    var getEmail = current.u_email_address;

    if (/\s/.test(getEmail)) {
        current.u_email_address = getEmail.trim().replace(/\s/g, '');
        getEmail.update();
    }
})(current, previous);
