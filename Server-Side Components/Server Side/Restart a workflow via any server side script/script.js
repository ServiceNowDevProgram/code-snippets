triggerWorkflow();
function triggerWorkflow(){
try{
var rec = new GlideRecord('table'); // give your table name
rec.addEncodedQuery('YOUR QUERY HERE FOR OLDER RECORDS');
rec.query();
while(rec.next()){
var wf = new Workflow();
wf.startFlow(wf.getWorkflowFromName('give the workflow name'), rec, 'update'); // give workflow name here
}
}
catch(ex){
gs.info('Exception'+ex);
}
