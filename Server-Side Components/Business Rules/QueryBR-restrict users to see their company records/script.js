// This is a before Query BR script.
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var enq = 'company=javascript:gs.getUser().getCompanyID()'; // query to get the records of logged in user's company. 
    current.addEncodedQuery(enq); // add the encoded query so that it can be applied in the query BR
    
})(current, previous);
