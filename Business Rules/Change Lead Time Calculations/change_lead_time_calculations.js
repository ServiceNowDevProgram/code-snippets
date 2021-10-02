(function executeRule(current, previous /*null when async*/) {
	
	var index = current.risk.getDisplayValue();
	var property = gs.getProperty('change.leadtime.value');
	var hashMap = JSON.parse(property); 
	var answer = hashMap[index];
    var gDate = new GlideDateTime();
    var sDate = new GlideDateTime(current.start_date);
	var diffSeconds = gs.dateDiff(gDate,sDate,true); 
    var hours = diffSeconds/3600;
	var days = hours/24;
	if(days < answer)
	{
		gs.addErrorMessage('Not enough lead time - atleast '+ answer +' day lead time required for '+ index + ' risk changes.');
		current.setAbortAction(true);
	}
	
})(current, previous);


