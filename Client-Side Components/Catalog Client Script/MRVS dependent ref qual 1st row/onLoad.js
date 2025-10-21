function onLoad() {
    //applies to MRVS, not Catalog Item. This will pass the first selected account (if there is one) to a Script Include each time a MRVS row is added or edited
    var mrvs = g_service_catalog.parent.getValue('my_mrvs'); //MRVS internal name
	var acct = '';
	if (mrvs.length > 2) { //MRVS is not empty
		var obj = JSON.parse(mrvs);
       	acct = obj[0].account_mrvs;
	}
	var ga = new GlideAjax('AccountUtils');
    ga.addParam('sysparm_name', 'setSessionData');
    ga.addParam('sysparm_account', acct);
    ga.getXMLAnswer(getResponse);
}

function getResponse(response) { 
    //do nothing 
}
