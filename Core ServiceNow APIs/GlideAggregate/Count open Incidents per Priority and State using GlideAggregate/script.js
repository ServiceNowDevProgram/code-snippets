/*
*Going to define the Incident Closed and Canceled state since we dont want those records as part of our query. 
*Also going to leverage the IncidentStateSNC script from ServiceNow
*/

/*
*Going to define the Incident Closed and Canceled state since we dont want those records as part of our query. 
*/
var incident_close = IncidentStateSNC.CLOSED;
var incident_canceled = IncidentStateSNC.CANCELED;
var incident_state_query = incident_close + "," + incident_canceled;

/*
*Creating the Incident State value object that will house the correct incident state since we are working from the Task table.
*Leveraging the IncidentStateSNC script from ServiceNow to get the values that they should be
*/
var incident_states = {
  '1':'New',
  '2':'In Progress',
  '3':'On Hold',
  '6':'Resolved',
  '7':'Closed',
  '8':'Canceled'
};

//Going to create the GlideAggregate object
var ga = new GlideAggregate('task');
ga.addQuery('state', 'NOT IN', incident_state_query); //Going to exclude the canceled and closed incidents
ga.addQuery('sys_class_name', 'incident'); //Since working on the Task table need to grab only Incident records with task type
ga.groupBy('state');
ga.groubBy('count');
ga.addAggregate('COUNT');
ga.query()

gs.info('The following is a list of Open Incident records');

while (ga.next()) {

  var priorityValue = ga.getDisplayValue('priority');
  var state = ga.getValue('state');
  var count = ga.getValue('COUNT');

  gs.info("There are a total of: " + count + " Incidents with a priority of " + priorityValue + " and in a state of " + incident_states[state]);
  
}
