(function executeRule(current, previous /*null when async*/ ) {

    var sTime = current.start_date.getDisplayValue(); 
	var eTime = current.end_date.getDisplayValue(); 

	gs.addInfoMessage("Start Date="+ sTime + " End Date="+eTime);

    var dur = gs.dateDiff(sTime, eTime);

    var dateDiff = new GlideDuration(dur);

    var d = dateDiff.getDayPart();

    gs.addInfoMessage("Number of Days :" + d);

})(current, previous);
