//Client callable script include
var getSIRDetails = Class.create();
getSIRDetails.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    getDetails: function() {
        var sir = this.getParameter('sysparm_sir'); //getting the newValue of Security Inc from onChange client script
        var obj = {}; //declare an object
        var gr = new GlideRecord('sn_si_incident');
        gr.addQuery('sys_id', sir); //Query to security incident table with the newValue
        gr.query();
        if (gr.next()) {
            obj.severity = gr.severity.getDisplayValue();  //Setting values in the obj
            obj.state = gr.state.getDisplayValue();
            obj.assignedto = gr.assigned_to.getDisplayValue();
        }
        return JSON.stringify(obj); //passing the object to client script
    },
    type: 'getSIRDetails'
});
