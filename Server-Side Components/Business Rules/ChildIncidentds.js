(function executeRule(current, previous /*null when async*/) {

        // Add your code here
        if(!current.isNewRecord()){
                var gr=new GlideRecord('incident');
                gr.addQuery('parent_incident',current.sys_id);
                gr.query();
                var c=gr.getRowCount();

                g_scratchpad.num=c;
        }

})(current, previous);
