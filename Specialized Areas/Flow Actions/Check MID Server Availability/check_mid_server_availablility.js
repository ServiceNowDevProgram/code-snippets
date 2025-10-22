(function execute(inputs, outputs) {

  var encodedQuery = 'status=Up'; 
  var process = false;
      
  var grMidServer = new GlideRecord('ecc_agent');
  	grMidServer.addEncodedQuery(encodedQuery); //Queries mid server with names from list which status is Up
  	grMidServer.query();
  	while(grMidServer.next()){   //If any of the mid servers are up, return to process request.
      	if (this.isMidserverCapable(grMidServer) && this.isMidserverSupport(grMidServer)){
        	process = true;
          	break;
        }
          
    }
  
   outputs.processrequest = process;
  
  
})(inputs, outputs);

//checks if mid server the correct capablities.
function isMidserverCapable(midserver){
  
  var midServerID = midserver.sys_id;
  var GRcapability = new GlideRecord('ecc_agent_capability_m2m');
  var ALLcapabilityID = 'eeab973fd7802200bdbaee5b5e610381'; // All sys ID
      GRcapability.addQuery('capability',ALLcapabilityID);
      GRcapability.addQuery('agent',midServerID);
      GRcapability.query();
  
  		if (GRcapability.next()){
         	return true; 
        }else{
         	return false; 
        }

}

//checks if mid server the supports Orchestration.
function isMidserverSupport(midserver){
  
  var midServerID = midserver.sys_id;
  var GRapp = new GlideRecord('ecc_agent_application_m2m');
  var ALLappID = '35aa573fd7802200bdbaee5b5e610375'; // ALL sys ID.
  var ORCHappID = 'b5f91a57d7002200bdbaee5b5e6103ec'; // Orchestration sys ID

  		GRapp.addQuery('agent',midServerID);
  		// query if MIDserver supports has ALL or Orchestration applitions
  		GRapp.addEncodedQuery('application=' + ALLappID + '^ORapplication=' + ORCHappID);
  
     	GRapp.query();
  
  		if (GRapp.next()){
         	return true; 
        }else{
         	return false; 
        }
 
}
