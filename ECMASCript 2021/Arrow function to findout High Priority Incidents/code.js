// Define a function to get the count of incidents with priority 1
function getHighPriorityIncidentCount() {
  var incidentGR = new GlideAggregate('incident');
  incidentGR.addQuery('priority', '1');
  incidentGR.addAggregate('COUNT');
  incidentGR.query();
  
  var highPriorityCount = 0;
  if (incidentGR.next()) {
    highPriorityCount = incidentGR.getAggregate('COUNT');
  }
  
  return highPriorityCount;
}

// Call the function to get the count
var count = getHighPriorityIncidentCount();

gs.info('Count of incidents with priority 1: ' + count);
