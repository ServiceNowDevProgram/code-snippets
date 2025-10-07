#BusinessRule
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

#ClientScript

function onLoad() {
   //Type appropriate comment here, and begin script below
var res=g_form.isNewRecord();
if(!res){
 var number=g_scratchpad.num;
   alert("Child incident count of this record :"+number);
}
   
}
