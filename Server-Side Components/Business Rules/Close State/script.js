var pSysId = 'sys_id'; 
var child= new GlideRecord('incident'); 
child.addQuery('parent_incident',pSysId);

child.query();
var count=0;
while(child.next()){

    if(child.state!=7)
    {
count =1;
    gs.print("your child incident is not there or is not yet closed");
    }

    
}

if(count==0){
    child.parent_incident.state=7;
    child.parent_incident.close_code='Duplicate';
child.parent_incident.close_notes="done";
child.parent_incident.update();
gs.print("hello" + child.parent_incident.number);

}
