var CatalogClientScripts = Class.create();
CatalogClientScripts.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    //Check records counts
    getGroupRecords: function() {
        var table = this.getParameter('sysparm_table');
        var encodedQuery = this.getParameter('sysparm_encodedQuery');
        var groupName = this.getParameter('sysparm_groupName');

        var grTable = new GlideRecord(table);
        grTable.addEncodedQuery(encodedQuery);
        grTable.query();
        if (grTable.getRowCount() > 0) {
            return true;
        } else {
            var grMTOM = new GlideRecord('sc_item_option_mtom');
            grMTOM.addEncodedQuery('sc_item_option.item_option_new.sys_id=2008e09c1b4d4d90b17699798b4bcbc5^request_item.stateIN-5,1,2^sc_item_option.value=' + groupName);
            grMTOM.query();
            if (grMTOM.next()) {
                return 'wip';
            } else {
                return false;
            }
        }
    },

    /*  Description: Performs users authentication
		Input Value: User ID (sys_id), current password
    	Output Value: Authnetication result (true or false), Locked Out (true or false) and User ID (string)
    */
    getUserAuthenticate: function() {
        var userSysID = this.getParameter('sysparm_userSysID');
        var currentPassword = this.getParameter('sysparm_currentPassword');

        //Get User record details
        var grScriptInclude = JSON.parse(new global.glide_record_functions().getSingleRecord('sys_user', 'sys_id=' + userSysID));

        //Check Authentication
        var grUserAuthenticate = GlideUser.authenticate(grScriptInclude.user_name, currentPassword);
        return grUserAuthenticate + ',' + grScriptInclude.locked_out + ',' + grScriptInclude.user_name; //true or false

    },

    /*  Description: Fetch single record value with all fields
		Input Value: Table Name, Encoded Query and Specific fileds (optional)
		Output Value: single record with all fields value in JSON format
	*/
    getTableRecords: function() {
        var tableName = this.getParameter('sysparm_tableName');
        var encodedQuery = this.getParameter('sysparm_encodedQuery');
        var requiredFields = this.getParameter('sysparm_requiredFields').toString();
        //Get User record details
        var scriptInclude = new global.glide_record_functions().getTableRecords(tableName, encodedQuery, requiredFields);
        return scriptInclude;
    },

    /*  Description: Encrypt the given data
    	Input Value: Field Value
    	Output Value: Encrypted value
    */
    dataEncryption: function() {
        var data = this.getParameter('sysparm_data').toString();
        //Perform encryption
        var scriptInclude = new global.glide_record_functions().dataEncryption(data);
        return scriptInclude;
    },


    /*  Description: Decrypt the given data
    	Input Value: Field Value
    	Output Value: Decrypted value
    */
    dataDecryption: function() {
        var data = this.getParameter('sysparm_data').toString();
        //Perform decryption
        var scriptInclude = new global.glide_record_functions().dataDecryption(data);
        return scriptInclude;
    },


    /*  Description: Get property value
    	Input Value: Property name
    	Output Value: Property value
    */
    getProperty: function() {
        var propertyName = this.getParameter('sysparm_propertyName').toString();
        //Fetch property
        var scriptInclude = new global.glide_record_functions().getProperty(propertyName);
        return scriptInclude;
    },

    /*  Description: Check is user memberOf specific group
		Input Value: UserID, GroupID
		Output Value: true or false
	*/
    isUserMemberOfGroup: function() {
        var userID = this.getParameter('sysparm_userId').toString();
        var groupID = this.getParameter('sysparm_groupId').toString();
        return new global.TriggerRuleSNC()._isUserMemberOfGroup(userID, groupID).toString();
    },

    type: 'CatalogClientScripts'
});
