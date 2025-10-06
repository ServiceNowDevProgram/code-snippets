var configItemsOwnedByLoggedInUser = Class.create();
configItemsOwnedByLoggedInUser.prototype = {
    initialize: function() {
    },

        getRecords: function(){
                var gr=new GlideRecord('cmdb_ci');
                gr.addQuery('owned_by',gs.getUserID());
                gr.query();
                var records="";
                while(gr.next()){
records = records+" "+gr.sys_id;
                }
                return 'sys_idIN'+records;

        },

    type: 'configItemsOwnedByLoggedInUser'
};
