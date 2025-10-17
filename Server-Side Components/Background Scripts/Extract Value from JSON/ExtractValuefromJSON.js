/**
 * Script Name: Extract User Roles from JSON
 * Description: 
 * This ServiceNow background script parses a JSON of user names and their titles (roles),
 * groups multiple titles under each unique user, and logs the result in System Logs.
 
 * Requirements:
 * - Run this script in 'Scripts - Background' in ServiceNow.
 * - Avoids duplicate roles for the same user.
 * - Shows unique users and their corresponding roles.
 
 * Author: Sachin Narayanasamy
 **/

(function() {
    // JSON containing usernames and titles
    var userData = {
        "userDetails": [
            { "user_name": "dennis.millar", "title": "Account Exec Northeast" },
            { "user_name": "ashley.parker", "title": "Director" },
            { "user_name": "steve.schorr", "title": "Investigations Generalist" },
            { "user_name": "tammie.schwartzwalde", "title": "Senior Auditor" },
            { "user_name": "tammie.schwartzwalde", "title": "Payroll Generalist" },
            { "user_name": "tommy.tom", "title": "Tester" }
        ]
    };

    // Object to hold unique users and their roles
    var userRoles = {};

    // Iterate and group titles
    for (var i = 0; i < userData.userDetails.length; i++) {
        var user = userData.userDetails[i];
        var userName = user.user_name;
        var title = user.title ? user.title.trim() : "No Title";

        if (!userRoles[userName]) {
            userRoles[userName] = [];
        }

        if (userRoles[userName].indexOf(title) === -1) {
            userRoles[userName].push(title);
        }
    }

    // Log results
    for (var userName in userRoles) {
        gs.info("User: " + userName + " having Role(s): " + userRoles[userName].join(", "));
    }

    gs.info("Total unique users: " + Object.keys(userRoles).length);
})();
