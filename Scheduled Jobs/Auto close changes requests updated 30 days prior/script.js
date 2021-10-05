// Sript to auto close change requests if thre is no update from past 30 days.

var chg = new GlideRecord('change_request');
chg.addActiveQuery(); // to fetch active change requests
chg.addEncodedQuery('sys_updated_on<=javascript:gs.beginningOfLast30Days()'); // to get change requests upadated 30 days before
chg.query();
while(chg.next())
	{
		chg.comments = 'Auto closing changing requests as there is no update from past 30 days';
		chg.state = 3;
		chg.setWorkflow(false); // to prevent from any BR to run.
		chg.autoSysFields(false); // to prevent system fields to get upadated. (optional)
		chg.update();
	}
