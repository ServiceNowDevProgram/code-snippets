var sysID = 'custom_sys_id';
    var dt = new sn_dt.DecisionTableAPI(); //Calling Decision Table API
    var inputs = new Object();
    inputs['u_csf'] = current.u_csf_capability; //Map to Decision Table Question Inputs
    var response = dt.getDecision(sysID, inputs);
    if (response != null) {
		var csfDomain = response.result_elements.u_csf_domain;
		var csfPillar = response.result_elements.u_csf_pillar;
		current.u_csf_domain = csfDomain;
		current.u_csf_pillar = csfPillar; //works well for multiple permutations and combinations on Risk Record
    }
