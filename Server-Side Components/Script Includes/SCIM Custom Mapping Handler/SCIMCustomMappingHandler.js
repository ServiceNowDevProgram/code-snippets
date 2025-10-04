var SCIMCustomMappingHandler = Class.create();
SCIMCustomMappingHandler.prototype = {
    initialize: function(debug) {
        if (debug) {
            this.debug = true;
        }
    },

    handleGroupMemberships: function(entitlementsList, userSysID){

        this.removeMembershipsNotInEntitlements(entitlementsList, userSysID);
        this.addAllMembershipsInEntitlements(entitlementsList, userSysID);

    },

    addAllMembershipsInEntitlements: function(entitlementsList, userSysID){

        for (entitlement in entitlementsList){
            var groupSysID = '';
            var groupGR = new GlideRecord('sys_user_group');
            if(groupGR.get('name', entitlementsList[entitlement])){
                
                if (!this._isMemberAlready(groupGR.getUniqueValue(), userSysID)){
                    groupSysID = groupGR.getUniqueValue();
                }

            }else{
                groupSysID = this._createNewGroup(entitlementsList[entitlement]); 
            }

            if(groupSysID && groupSysID.length == 32){
                this.createGroupMembership(groupSysID, userSysID);
            }
        }
    },

    removeMembershipsNotInEntitlements: function(entitlementsList, userSysID){

        var membershipsToBeDeletedGR = new GlideRecord('sys_user_grmember');
        membershipsToBeDeletedGR.addQuery('user', userSysID);
        membershipsToBeDeletedGR.addQuery('group.name', "NOT IN", entitlementsList); 
        membershipsToBeDeletedGR.query();

        membershipsToBeDeletedGR.deleteMultiple();
    },  
    
    createGroupMembership: function(groupSysID, userSysID) {
        var groupMembershipGR = new GlideRecord('sys_user_grmember');
        groupMembershipGR.initialize();
        groupMembershipGR.setValue('user', userSysID);
        groupMembershipGR.setValue('group', groupSysID);
        var membershipSysID = groupMembershipGR.insert();

        if(this.debug){
            if (membershipSysID){
                gs.info ('Group membership created for User: ' + this._getUserDisplayValueAndEmail(userSysID) + ' and Group: ' + this._getGroupDisplayValue(groupSysID), this.type);
            }
        }
    },

    deleteGroupMembership: function(groupSysID, userSysID) {

        var groupMembershipGR = new GlideRecord('sys_user_grmember');
        groupMembershipGR.addQuery('group', groupSysID);
        groupMembershipGR.addQuery('user', userSysID);
        groupMembershipGR.query();

        if (groupMembershipGR.next()) {
            groupMembershipGR.deleteRecord();
                
            if (this.debug) {
                gs.info("User: " + this._getUserDisplayValueAndEmail(userSysID) + ' has been removed from ' + groupMembershipGR.group.getDisplayValue(), this.type);
            }
        }
    },

    _getUserDisplayValueAndEmail: function(userSysID) {
        var userGR = new GlideRecord('sys_user');
        if (userGR.get(userSysID)) {
            var userInfo = userGR.getDisplayValue() + ' (' + userGR.getValue('email') + ')';
            return userInfo;
        }else{
            gs.info("User with sys_id: " + userSysID + ' does not exist.', this.type);
        }
    },

    _getGroupDisplayValue: function(groupSysID) {
        var groupGR = new GlideRecord('sys_user_group');
        if (groupGR.get(groupSysID)) {
            return groupGR.getDisplayValue();
        }else{
            gs.info("Group with sys_id: " + groupSysID + ' does not exist.', this.type);
        }
    },

    
    _createNewGroup: function(groupName){
        if (this.debug){
            gs.info('_createNewGroup invoked with groupName = ' + groupName, this.type);
        }
        
        var newGroupGR = new GlideRecord('sys_user_group');
        newGroupGR.initialize();
        newGroupGR.setValue('name', groupName);
        
        return newGroupGR.insert();
    
    },

    _isMemberAlready: function(groupSysID, userSysID){
        var membershipGR = new GlideRecord('sys_user_grmember');
        membershipGR.addQuery('group', groupSysID);
        membershipGR.addQuery('user', userSysID);
        membershipGR.query();

        if (membershipGR.hasNext()){
            return true;
        }
        return false;
    },

    type: 'SCIMCustomMappingHandler'
};
