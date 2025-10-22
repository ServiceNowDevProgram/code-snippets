//The client script related to this script include is added under Glide Ajax folder named updateCallerLocationinShortDesc
var getCallerLocation = Class.create();
getCallerLocation.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getLocation: function() {
        var userId = this.getParameter('sysparm_user');
        var gr = new GlideRecord('sys_user');  //user table
        gr.addQuery('sys_id', userId); //Adding query for sys ID of user's ID
        gr.query();
        if (gr.next()) {
            var a = gr.location.name; //Fetching the current record location
            return a;
        }
    },
    type: 'getCallerLocation'
});
