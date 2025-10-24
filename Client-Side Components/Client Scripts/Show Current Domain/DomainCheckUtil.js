var DomainCheckUtil = Class.create();
DomainCheckUtil.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    //get current domain of user session
    getCurrentDomainName: function() {
        var sessionDomainId = gs.getSession().getCurrentDomainID();
        var gr = new GlideRecord('domain');
        if (gr.get(sessionDomainId)){
            return gr.name;
		}
    //Return global domain name  
    return 'Global';
    },

    type: 'DomainCheckUtil'
});
