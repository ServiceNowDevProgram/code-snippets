var CallerInfoHelper = Class.create();
CallerInfoHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getCallerInfo: function() {
        var callerSysId = this.getParameter('sysparm_caller');
        if (!callerSysId)
            return JSON.stringify({ email: '', mobile: '' });

        var userGR = new GlideRecord('sys_user');
        if (!userGR.get(callerSysId))
            return JSON.stringify({ email: '', mobile: '' });

        var userObj = {
            email: userGR.email.toString(),
            mobile: userGR.mobile_phone.toString()
        };

        return JSON.stringify(userObj);
    },

    type: 'CallerInfoHelper'
});
