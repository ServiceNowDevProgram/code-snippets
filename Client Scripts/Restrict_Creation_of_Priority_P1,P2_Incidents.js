//Client Script

//Type onChnage, Field name: Priority

// To restrict creation of priority P1, P2 incidents except for the admins and a particular group members

var checkAjax = '';
// if logged in user is admin then skip the code execution
if(!g_user.hasRole('admin')){
	if(newValue == 1 || newValue == 2){
		if(g_form.isNewRecord()){
	
		checkAjax = new GlideAjax('checkMemberOfGroup');
		checkAjax.addParm('sysparm_name', 'checkAccessNew');
		checkAjax.getXMLWait();
		var ans = checkAjax.getAnswer();
		if(and == 'false'){
			g_form.setValue('impact', 3);
			g_form.setValue('urgency', 3);
			g_form.addErrorMessage('Creation of P1, P2 incidents is restricted to Admins and IT ServiceDesk');
		}
		else{
			var incNumber = g_form.getValuye('number');	
			checkAjax = newGlideAjax('checkMemberOfGroup');
			checkAjax.addParm('sysparm_name', 'checkAccess');
			checkAjax.addParm('sysparm_number', incNumber); // passing the current incident number so that if the logged in user is an end user, then get the previous values of impact and urgency values.
			checkAjax.getXMLWait();
			var ans = checkAjax.getAnswer();
			ans = ans.split(",");
			// if value returned false, then logged in user is neither admin nor member of a particluar gorup, 
			if(ans[2] == 'false'){
				var imp = parseInt(ans[0]);
				var urg = parseInt(ans[1]);
				// setting back the impact and urgency values to their previous values if logged in user is not part of a particular group and not an admin.
				g_form.setValue('impact', imp);
				g_form.setValue('urgency', urg);
				g_form.addErrorMessage('Creation of P1, P2 incidents is restricted to Admins and IT ServiceDesk');
			}
		}
	}
}
