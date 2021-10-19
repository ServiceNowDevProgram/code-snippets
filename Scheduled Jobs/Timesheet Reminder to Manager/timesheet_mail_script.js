(function runMailScript(current, template, email, email_action, event) {
	 
	var manager = event.parm1;	
  var item = new GlideAggregate('time_sheet_exception');
	item.addEncodedQuery('stateINPending,Submitted,Rejected,Not_Submitted^week_starts_onONLast week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()');
	item.addQuery("user.manager","IN", manager);
	item.query();
	if (item.getRowCount() > 0) {
    template.print("<b>TimeSheet Defaulters:</b>");
	  template.print("<b><table table-layout:fixed style=width:100%><tr><td width=40%>Name</td><td width=20%>Week Starts On</td><td width=40%>State</td></tr></table></b>");
	  template.print("<br />");
    while(item.next()) {
	  template.print("<table table-layout:fixed style=width:100% ><tr><td width=40%>"+ item.user.getDisplayValue('name')+ "</td><td width=20%>"+ item.week_starts_on + "</td><td width=40%>"+ item.state + "</td></tr></table>");
	  template.print("<br />");
	}}
  
})(current, template, email, email_action, event);
