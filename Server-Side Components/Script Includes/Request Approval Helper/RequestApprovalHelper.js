var RequestApprovalHelper = Class.create();

RequestApprovalHelper.prototype = {
	initialize: function() {
	},
	
	///
	/// Checks all RTIMs approval status for a request
	/// Returns True if all RTIMs are approved or rejected
	///
	areAllRTIMsApprovedOrRejected : function(requestSysId) {
		var result = false;
		
		var rtimGR = new GlideRecord('sc_req_item');
		
		rtimGR.addQuery('request', requestSysId);
		rtimGR.query();
		
		// If ALL RTIMs are approved or rejected
		var allRTIMsHaveDecisionAndAtleastOneApproved = this._CheckForAllRTIMsApprovedOrRejected(rtimGR);
		
		if (allRTIMsHaveDecisionAndAtleastOneApproved) {
			result = true;
		}
		
		return result;
	},

	
	///
	/// Update the request and mark the flag that all RTIMs are approved or rejected
	///
	updateRequest : function(requestSysId){
		
		var rec = new GlideRecord('sc_request');
		rec.get(requestSysId);

		if(rec){
			rec.u_all_rtims_are_approved_or_rejected = true;
			rec.update();
		}
		
	},
	
	///
	/// Helper that checks all RTIMs have a decision i.e. Either approved or rejected e.g. not requested etc
	///
	_CheckForAllRTIMsApprovedOrRejected : function(rtimGR) {
		
		var result = false;
		var totalRecords = rtimGR.getRowCount();
		var approvedCounter = 0;
		var rejectedCounter = 0;
		
		while (rtimGR.next()) {
			
			var status = rtimGR.approval;
			
			if (status == 'approved') {
				approvedCounter += 1;
			}
			
			if (status == 'rejected') {
				rejectedCounter += 1;
			}
		}
		
		// At least one approved exist
		if (approvedCounter > 0) { 
			
			// All records either approved or rejected
			if(approvedCounter + rejectedCounter == totalRecords){
				result = true;
			}
		}
		
		return result;
	},
	
	type: 'RequestApprovalHelper'
};
