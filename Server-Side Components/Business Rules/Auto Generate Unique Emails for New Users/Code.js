(function executeRule(current, previous /*null when async*/ ) {

// Get Name and User id values 
    var cleanName = current.name.replace(/,/g, '').trim();

    var nameParts = cleanName.split(/\s+/);

    var initials = '';
    for (var i = 0; i < nameParts.length; i++) {
        if (nameParts[i].length > 0) {
            initials += nameParts[i][0];
        }
    }

    // Create email alias
    var emailAlias = initials.toLowerCase() + '.' + current.user_name.toLowerCase() + '@company.com';

    // Set output value to email field
    current.email = emailAlias;
    current.update();

})(current, previous);
