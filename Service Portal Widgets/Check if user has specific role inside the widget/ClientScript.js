// Inject glideUserSession so we can check the exact role using
// Note this is widget Client code

function(glideUserSession) {
    var c = this;

    c.userHasApproverRole = true;

    glideUserSession.loadCurrentUser().then(function (currentUser) {
        //To check current user has specified role only. Equivalent of g_user.hasRoleExactly('approver_user');
        c.userHasApproverRole = currentUser.hasRoleExactly('approver_user');
    });

}
