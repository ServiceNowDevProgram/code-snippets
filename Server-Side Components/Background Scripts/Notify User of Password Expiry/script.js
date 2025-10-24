var userGR = new GlideRecord('sys_user');
userGR.query();
while (userGR.next()) {
    var expiryDate = new GlideDateTime(userGR.password_needs_reset_by);
    var today = new GlideDateTime();
    var diff = GlideDateTime.subtract(expiryDate, today);

    // Check the difference in days
    if (diff.getDays() < 7) {
        gs.eventQueue('password_expiry', userGR, 'Your password will expire in ' + diff.getDays() + ' days.', '');
    }
}
