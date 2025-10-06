(function executeRule(current, previous /*null when async*/) {

        // Add your code here

        var gr=new GlideRecord('incident');
        gr.addQuery('caller_id',current.caller_id);
        gr.addQuery('short_description','CONTAINS','email');
        gr.query();
        if(gr.next()){
                gs.addErrorMessage("You have already created the incident with the similar short description");
                current.setAbortAction(true);
        }

})(current, previous);
