//create a after insert business rule on sys_user_group table.

(function executeRule(current, previous /* null when async */){

var restMsg = new sn_ws.RestMessageV2('Create group in QA', 'Create group');
restMsg.setStringParameterNoEscape('name', current.namee);
restMsg.setStringParameterNoEscape('manager', current.manager);
restMsg.setStringParameterNoEscape('type', current.type);
restMsg.setStringParameterNoEscape('sys_id',current.sys_id);
restMsg.execute();

 var response = restMsg.execute();
  var reqBody = restmsg.getrequestBody();
  var responseBody = response.getBody();
  var htttpStatus = response.getStatusCode();

}}(current, previous);
  
