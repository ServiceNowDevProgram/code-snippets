#BusinessRule
 (function executeRule(current, previous /*null when async*/) {

        // Add your code here
        var user=current.requested_by;
        var obj=new withClass3();
        var res=obj.getCount(user);
        if(res > 5){
                gs.addErrorMessage("You have already made change requests more than 5 times");
                current.setAbortAction(true);
        }        

})(current, previous);
#ScriptInclude
   
 	
var withClass3 = Class.create();
withClass3.prototype = {
    initialize: function() {
    },

        getCount: function(user){
                var gr=new GlideRecord('change_request');
                gr.addQuery('requested_by',user);
                gr.query();
                return gr.getRowCount();

        },

    type: 'withClass3'
