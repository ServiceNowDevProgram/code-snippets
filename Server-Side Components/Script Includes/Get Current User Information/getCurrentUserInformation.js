var GetCurrentUserInfo = Class.create();
GetCurrentUserInfo.prototype = {
    initialize: function() {},

    getCurrentUserInfo: function() {
        var currentUser = gs.getUser(); //This will give the reference to current user object.
        var userId = currentUser.getName();
        var firstName = currentUser.getFirstName();
        var lastName = currentUser.getLastName();
        var email = currentUser.getEmail();
        var sysId = currentUser.getID();
        var roles = currentUser.getRoles();

        return {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            roles: roles,
            sysId: sysId
        };
    },
    type: 'GetCurrentUserInfo'
};
