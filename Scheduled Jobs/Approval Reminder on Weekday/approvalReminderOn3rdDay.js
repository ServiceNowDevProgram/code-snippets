//Trigger notification reminder on weekday to approvals if they not approved in 3 days  
var mk=new GlideRecord('sysapproval_approver');
mk.addEncodedQuery('source_table=sc_req_item^state=requested');
//fectch the requested approval of request item table
mk.query();   
while(mk.next())
{
  //gs.info( mk.getValue('sys_created_on') +" start date1 ");
var gr1 = gs.nowDateTime();
var stdate=new GlideDateTime(mk.getValue('sys_updated_on'));
//gs.print(stdate + "  start date" );
var days=parseInt('9');
days=days*3
gs.print(days);
var dur=new GlideDuration(60*60*1000*days);
gs.print(dur + ":duration");
var sch=new GlideSchedule('08fcd0830a0a0b2600079f56b1adb9ae');
//weekday schedule sys is
var end=sch.add(stdate,dur);
var diff= parseInt((gs.dateDiff(gr1, end,true))/60/60/24);
if(diff<=0)
{
//trigger notification reminders to approvals on weekday if they not approved in 3 days from creation date and  only if the 
gs.eventQueue('pending.approval.3rdday',mk,mk.approver.getValue('email'),'');

}

}

//gs.print(mk.getRowCount() + " count");
