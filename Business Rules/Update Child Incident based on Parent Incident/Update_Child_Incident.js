/**
* @Description : On After Business Rule to Update Child incident based on parent incident
* @monitorFields : Fields to be moniter to be updated on the child record
* @changedFields : Fields which are getting updated
* @changedMnitorFields : Array of monitor fields which got changed
**/

(function executeRule(current, previous /*null when async*/) {

	var monitorFields = ['caller_id','state','impact','description']; // Fields to be moniter to be updated on the child record
	
	var changedFields = []; // Fields which are getting updated
	for (var x in current){
		if (current[x] != previous[x]) {
			changedFields.push(x);
		}
	}

	var changedMnitorFields = changedFields.filter(function (ele) { // Get the array of monitor fields which got changed
		return monitorFields.indexOf(ele) != -1;
	});

	var grIncident = new GlideRecord('incident');
	var query = gs.getMessage('parent_incident={0}^active=true',[current.getUniqueValue()]); // Get all the Active child incident
	grIncident.addEncodedQuery(query);
	grIncident.query();
	while (grIncident.next()) {
		changedFields.forEach (function (ele) {
			grIncident[ele] = current[ele];
		});
		grIncident.update();
	} 
})(current, previous);
