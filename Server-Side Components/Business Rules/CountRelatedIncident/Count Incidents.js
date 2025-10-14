(function executeRule(current, previous /*null when async*/) {

var problemSysId = current.sys_id; 
var agg = new GlideAggregate('incident');
agg.addQuery('problem_id', problemSysId); 
agg.addAggregate('COUNT'); 
agg.query();

if (agg.next()) {
    var incidentCount = agg.getAggregate('COUNT');
    gs.addInfoMessage('There are ' + incidentCount + ' incidents related to this problem.');
}

})(current, previous);
