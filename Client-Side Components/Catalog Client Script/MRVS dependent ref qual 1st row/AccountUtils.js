var AccountUtils = Class.create();
AccountUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    //Populate the department name from the account in the session data for the reference qualifier to use:
    
    setSessionData: function() {
        var acct = this.getParameter('sysparm_account');
		    var dept = '';
		    var acctGR = new GlideRecord('customer_account'); //reference table for Account variable
		    if (acctGR.get(acct)) {
			      dept = '^dept_name=' + acctGR.dept_name; //department field name on account table
		    }
		
		    var session = gs.getSession().putClientData('selected_dept', dept);
        return;
    },

    type: 'AccountUtils'
});
