/**
 * Get a random user from a specific user group
 *
 * @param {string} group - The sys_id of the group to select a user from
 * @returns {string|null} - The sys_id of a randomly selected user from the specified group or null if no user is found
 */

function getRandomUserFromGroup(group) {

    var users = [];

    var grMember = new GlideRecord("sys_user_grmember");
    grMember.addNotNullQuery("user");
    grMember.addQuery("group", group);
    grMember.query();

    while (grMember.next()) {
        users.push(grMember.getValue("user"));
    }

    if (users.length > 0) {
        // Select a random user from the "users" array
        return users[Math.floor(Math.random() * users.length)];
    } else {
        // Return null if no user is found in the specified group
        return null;
    }
}
