var RecursiveByManager = Class.create();
RecursiveByManager.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    initialize: function () { },
    maxDepth: 7,

    getUserSysIds: function (managersName, depth, includeInactive, managerSysId) {
        var managersId;
        if (managersName) {
            managersId = this._getUserSysId(managersName);
        }
        else if (managerSysId) {
            managersId = managerSysId;
        }

        if (managersId) {
            // No more than max depth of 7. 
            if (depth) {
                if (depth > this.maxDepth) {
                    depth = this.maxDepth;
                }
            }
            else {
                depth = this.maxDepth;
            }

            // Add manager's sys_id to array to get their groups too. 
            var arr = [managersId];
            return arr.concat(this._getSubordinate(managersId, depth, includeInactive));
        }
        else { // No user found.
            return 'Manager\'s name not found.';
        }
    },

    getGroupSysIds: function (managersName, depth, managerSysId) {
        var arr;
        if (managersName) {
            arr = this.getUserSysIds(managersName, depth, true);
        }
        else if (managerSysId) {
            arr = this.getUserSysIds(null, depth, true, managerSysId);
        }
        else { // No user found.
            return 'Manager not found.';
        }

        if (arr) {
            return this._getGroups(arr);
        }
        else { // No user found.
            return 'Manager not found.';
        }
    },

    _getUserSysId: function (managersName) {
        // Get manager's sys_id
        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('name', managersName);
        grUser.setLimit(1);
        grUser.query();

        if (grUser.next()) {
            return grUser.getValue('sys_id');
        }
        return false;
    },

    _getSubordinate: function (managerSysId, depth, includeInactive) {
        // Keep digging. 
        if (depth > 0) {
            var grUser = new GlideRecord('sys_user'),
                usersSysIds = [],
                newArray = [];

            depth--;

            grUser.addEncodedQuery('web_service_access_only=false^manager=' + managerSysId);
            grUser.query();
            while (grUser.next()) {
                // Manager shouldn't be what was passed in. e.g use case where CEO is his,her own manager.
                if (grUser.getValue('sys_id') != managerSysId) {
                    // Do we want just active users? 
                    if (!includeInactive) {
                        if (grUser.active) {
                            usersSysIds.push(grUser.getValue('sys_id'));
                        }
                    }
                    else {
                        usersSysIds.push(grUser.getValue('sys_id'));
                    }
                    newArray = this._getSubordinate(grUser.getValue('sys_id'), depth);
                    if (newArray) {
                        usersSysIds = usersSysIds.concat(newArray);
                    }
                }
            }

            return usersSysIds;
        }
        else { // No more digging. 
            return false;
        }
    },

    _getGroups: function (managerArray) {
        var grGroup = new GlideRecord('sys_user_group'),
            groupSysIds = [];

        grGroup.addEncodedQuery('active=true^managerIN' + managerArray.join(','));
        grGroup.query();
        while (grGroup.next()) {
            groupSysIds.push(grGroup.getValue('sys_id'));
        }

        return groupSysIds;
    },

    type: 'RecursiveByManager'
});

// Added so this could be called without having to instantiate the class. 
RecursiveByManager.getGroupSysIds = function (managerSysId, depth) {
    var util = new RecursiveByManager();
    return util.getGroupSysIds(managerSysId, depth);
};

RecursiveByManager.getUserSysIds = function (managerSysId, depth) {
    var util = new RecursiveByManager();
    return util.getUserSysIds(managerSysId, depth);
};
