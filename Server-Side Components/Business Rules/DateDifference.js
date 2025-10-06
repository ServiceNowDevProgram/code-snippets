(function executeRule(current, previous /*null when async*/) {

        // Add your code here
if(current.u_termination_date.changes()){
                var date1=current.u_current_date;
        var date2=current.u_termination_date;

        var res=onDemand1(date1,date2);
        gs.addInfoMessage("Date Difference is :"+res);

}
})(current, previous);
