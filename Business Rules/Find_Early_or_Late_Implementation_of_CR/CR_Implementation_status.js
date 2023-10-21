// Create a before update business rule on change_request table with the below conditions
//Type is one of Standard, Normal, Emergency
//AND
//State changes to Implement

(function executeRule(current, previous /*null when async*/){

var startDate = current.start_date;
var nowTime = new GlideDateTime();
// Find the difference between nowTime and CR startDate

var diff = gs.dateDiff(nowTime, startDate, true); // returns the difference in seconds

diff = Math.floor(diff/ 60); // convert seconds to minutes

if(diff >=15){

current.u_implement_early = 0;

}
else{

current.u_implement_early = 1;

}
