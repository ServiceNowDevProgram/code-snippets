
    var blockedGR = new GlideRecord('sys_blocked_email_address');
    blockedGR.addQuery('fail_count', '>', 8);
    blockedGR.query();

    while (blockedGR.next()) {
        var userGR = new GlideRecord('sys_user');
        userGR.addQuery('email', blockedGR.email_address); 
        userGR.addQuery('active', true);
        userGR.query();

        if (userGR.next()) {
            // Update user record
            userGR.state = 'new'; 
            userGR.update();

            // Reset fail_count on blocked email record
            blockedGR.fail_count = 0;
            blockedGR.update();
        }
    }
