function onLoad() {
   
    /*
	Inputs 
	1. Related list name
	2. Table name which has been related to
	3. Field name through which relationship made

	E.g.,
	1. Related list name - incident [Child Incidents]
	2. Table name which has been related to - incident [Incident]
	3. Field name through which relationship made - parent_incident [Parent Incident]


	Output
	If true = Hide the Related List
	Else = there is record won't hide the Related List

	*/

	// Related list that want to hide when there is no record in the related list records
	// Can add other related list as well this object is define as 
	// {related_list_name :{table : table_related_to, ref: field_reference_to_the_table}}

   var relatedList = {
        'task_sla': { table: 'task_sla', ref: 'task' },
		'incident' : {table : 'incident', ref: 'parent_incident'},
        'incident_task': { table: 'incident_task', ref: 'parent' }
    };


	// Called the function based on the list of related list in the object.,
    for (var listName in relatedList) {
        checkAndHideRelatedList(listName, relatedList[listName]);
    }

	// function which is used to called the Script include through GlideAjax and check whether record is there are not and get the response based on that it will hide the related list.
    function checkAndHideRelatedList(listName, config) {
        var ga = new GlideAjax('CheckRelatedListRecord');
        ga.addParam('sysparm_name', 'hasRecord');
        ga.addParam('sysparm_related_table', config.table);
        ga.addParam('sysparm_reference_field', config.ref);
        ga.addParam('sysparm_record_sys_id', g_form.getUniqueValue());

        ga.getXMLAnswer(function(answer) {
            if (answer == 'false') {
                g_form.hideRelatedList(listName);
               
            }
        });
    }
   
}