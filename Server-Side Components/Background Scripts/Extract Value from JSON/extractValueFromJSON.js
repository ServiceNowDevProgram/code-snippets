//JSON of username and corresponding title

var userData = {
    "userDetails": [{
            "user_name": "dennis.millar",
            "title": "Account Exec Northeast"
        },
        {
            "user_name": "ashley.parker",
            "title": "Director"
        },
        {
            "user_name": "steve.schorr",
            "title": "Investigations Generalist"
        },
        {
            "user_name": "tammie.schwartzwalde",
            "title": "Senior Auditor"
        },
        {
            "user_name": "tammie.schwartzwalde",
            "title": "Payroll Generalist"
        },
		{
            "user_name": "tommy.tom",
            "title": "Tester"
        },
    ]
};


var userRoles = {};
for (var i = 0; i < userData.userDetails.length; i++) {
    var user = userData.userDetails[i];
    if (!userRoles[user.user_name]) {
        userRoles[user.user_name] = [];
    }

    if (userRoles[user.user_name].indexOf(user.title) === -1) {
        userRoles[user.user_name].push(user.title);
    }
}


for (var userName in userRoles) {
    gs.info("User: " + userName + " having Role(s): " + userRoles[userName].join(", "));
}
