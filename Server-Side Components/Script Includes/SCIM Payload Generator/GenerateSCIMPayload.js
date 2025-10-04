var GenerateSCIMPayload = Class.create();
GenerateSCIMPayload.prototype = {
    initialize: function() {
    },

    // Function to generate a random string for new group names
    generateRandomString: function(length) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return "test group " + result;
    },

    // Function to retrieve the groups where the user is a member
    getUserGroups: function(userSysId) {
        var groupNames = [];
        var grGroupMember = new GlideRecord('sys_user_grmember'); // Group Member table
        grGroupMember.addQuery('user', userSysId); // Get groups of the user
        grGroupMember.query();
        
        while (grGroupMember.next()) {
            var groupName = grGroupMember.group.getDisplayValue(); // Get group name
            groupNames.push({
                name: groupName
            });
        }
        return groupNames;
    },

    // Function to retrieve groups where the user is NOT a member
    getGroupsNotMemberOf: function(userSysId) {
        var groupNames = [];
        var grGroup = new GlideRecord('sys_user_group'); // Group table

        // Subquery to find groups the user is a member of
        var subquery = new GlideRecord('sys_user_grmember');
        subquery.addQuery('user', userSysId);
        subquery.query();

        var groupIds = [];
        while (subquery.next()) {
            groupIds.push(subquery.group.sys_id.toString());
        }

        // Query for groups where the user is NOT a member
        grGroup.addQuery('sys_id', 'NOT IN', groupIds);
        grGroup.query();

        while (grGroup.next()) {
            groupNames.push({
                name: grGroup.name.toString() // Only store the group name
            });
        }

        return groupNames;
    },

    // Function to generate entitlements for current user groups, excluding a set number
    generateEntitlementsFromCurrentGroups: function(userSysId, groupsToRemove) {
        var currentGroups = this.getUserGroups(userSysId);
        var countToKeep = Math.max(0, currentGroups.length - groupsToRemove); // Ensure non-negative value
        var keptGroups = currentGroups.slice(0, countToKeep); // Keep the first groups, up to the count

        var entitlements = [];
        for (var i = 0; i < keptGroups.length; i++) {
            entitlements.push({
                "value": keptGroups[i].name // Add kept group names to entitlements
            });
        }
        return entitlements;
    },

    // Function to generate entitlements for groups the user will "join"
    generateEntitlementsForNewGroups: function(userSysId, groupsToAdd) {
        var availableGroups = this.getGroupsNotMemberOf(userSysId);
        var entitlements = [];

        for (var i = 0; i < groupsToAdd; i++) {
            if (availableGroups.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableGroups.length);
                var selectedGroup = availableGroups.splice(randomIndex, 1)[0];
                entitlements.push({
                    "value": selectedGroup.name // Add selected group names to entitlements
                });
            }
        }

        return entitlements;
    },

    // Main function to generate entitlements
    generateEntitlements: function(userSysId, groupsToRemove, groupsToAdd, newGroupsToCreate) {
        // Initialize the object
        var userObj = {
            "schemas": [
                "urn:ietf:params:scim:schemas:extension:servicenow:2.0:User",
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
            ],
            "id": userSysId,
            "meta": {
                "resourceType": "User",
                "created": "2006-07-11T21:16:15Z",
                "lastModified": new Date().toISOString(), // Current date for lastModified
                "location": "https://<instance-name>.service-now.com/api/now/scim/Users/" + userSysId //to be updated with your instance name
            },
            "userName": "jvittolo", // Replace with actual user name if needed
            "name": {
                "familyName": "Vittolo",
                "givenName": "Jamessss"
            },
            "displayName": "Jamessss Vittolo",
            "title": "VP, Client Services",
            "active": true,
            "emails": [
                {
                    "value": "jvittolo@example.com",
                    "type": "work"
                }
            ],
            "entitlements": []
        };

        // Step 1: Generate entitlements for existing groups (excluding some)
        var currentGroupEntitlements = this.generateEntitlementsFromCurrentGroups(userSysId, groupsToRemove);
        userObj.entitlements = userObj.entitlements.concat(currentGroupEntitlements);

        // Step 2: Generate entitlements for new groups the user will "join"
        var newGroupEntitlements = this.generateEntitlementsForNewGroups(userSysId, groupsToAdd);
        userObj.entitlements = userObj.entitlements.concat(newGroupEntitlements);

        // Step 3: Create new groups (non-existing) and add to entitlements
        for (var j = 0; j < newGroupsToCreate; j++) {
            var newGroupName = this.generateRandomString(12);
            userObj.entitlements.push({
                "value": newGroupName // Add new group names directly to entitlements
            });
        }

        // Return the modified object
        return userObj;
    },

    // Function to simulate removal of all group memberships
    removeAllGroupMemberships: function(userSysId) {
        // Initialize the object with all original properties
        var userObj = {
            "schemas": [
                "urn:ietf:params:scim:schemas:extension:servicenow:2.0:User",
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
            ],
            "id": userSysId,
            "meta": {
                "resourceType": "User",
                "created": "2006-07-11T21:16:15Z",
                "lastModified": new Date().toISOString(), // Current date for lastModified
                "location": "https://<instance-name>.service-now.com/api/now/scim/Users/" + userSysId
            },
            "userName": "jvittolo", // Replace with actual user name if needed
            "name": {
                "familyName": "Vittolo",
                "givenName": "Jamessss"
            },
            "displayName": "Jamessss Vittolo",
            "title": "VP, Client Services",
            "active": true,
            "emails": [
                {
                    "value": "jvittolo@example.com",
                    "type": "work"
                }
            ],
            "entitlements": [] // Empty entitlements array
        };

        return userObj; // Return the full object with empty entitlements
    },

    type: 'GenerateSCIMPayload'
};
