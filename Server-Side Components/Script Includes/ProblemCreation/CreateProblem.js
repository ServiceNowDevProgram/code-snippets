 
 	(function executeRule(current, previous /*null when async*/) {

        // Add your code here
if(current.category == 'hardware'){
        var gr=new GlideRecord('problem');
        gr.initialize();
        gr.short_description=current.short_description;
        gr.category=current.category;
        gr.impact=current.impact;
        gr.urgency=current.urgency;
        gr.insert();

}
})(current, previous);
