new EfficientGlideRecord('incident')
	.setLimit(10)
	.addQuery('assignment_group', '!=', 'some_group_sys_id')
	.addQuery('assigned_to', 'some_assignee_sys_id')
	.addNotNullQuery('assignment_group')
	.addField('number')
	.addField('short_description')
	.addField('assignment_group', true) //Get display value as well
	.orderBy('number')
	.query(function (egrIncident) {
		while (egrIncident.next()) {
			var logMsg = '';
			if (egrIncident.canRead('short_description')) {
				logMsg += 'Short description value: ' + egrIncident.getValue('short_description') + '\n';
			}
			if (egrIncident.canRead('number')) {
				logMsg += 'Number: ' + egrIncident.getValue('number') + '\n';
			}
			if (egrIncident.canRead('assignment_group')) {
				logMsg += 'Assignment group: ' + egrIncident.getValue('assignment_group') + ' (' +
					egrIncident.getDisplayValue('assignment_group') + ')';
			}
			
			console.log(logMsg);
		}
	});


//Get IDs, numbers, and assignment groups for all child Incidents with missing short descriptions
new EfficientGlideRecord('incident')
	.addQuery('parent', g_form.getUniqueValue())
	.addNullQuery('short_description')
	.addField('number')
	.addField('assignment_group', true) //Get display value as well
	.orderBy('number')
	.query(function (egrIncident) {
		var incidentsWithoutShortDesc = [];
		while (egrIncident.next()) {
			incidentsWithoutShortDesc.push(egrIncident.getValue('number'));
		}
		if (incidentsWithoutShortDesc.length > 0) {
			g_form.addErrorMessage(
				'The following child Incidents have no short description:<br />* ' +
				incidentsWithoutShortDesc.join('<br />* ')
			);
		}
	});

//Does at least one child Incident exist without a short description?
new EfficientGlideRecord('incident')
	.addQuery('parent', g_form.getUniqueValue())
	.addNullQuery('short_description')
	.addField('number')
	.query(function (egrIncident) {
		if (egrIncident.hasNext()) {
			g_form.addErrorMessage(
				'At least one child Incident exists without a short description.'
			);
		}
	});

//Show the number of child Incidents missing Short Descriptions.
new EfficientGlideRecord('incident')
	.addQuery('parent', g_form.getUniqueValue())
	.addNullQuery('short_description')
	.addField('number')
	.query(function (egrIncident) {
		if (egrIncident.hasNext()) {
			g_form.addErrorMessage(
				egrIncident.getRowCount() + ' child Incidents are missing a short description.'
			);
		}
	});

//Get assignment groups for child Incidents for some reason
new EfficientGlideRecord('incident')
	.addQuery('parent', g_form.getUniqueValue())
	.addField('assignment_group', true) //Get display value as well
	.query(function (egrIncident) {
		var assignmentGroupNames = [];
		while (egrIncident.next()) {
			assignmentGroupNames.push(egrIncident.getDisplayValue('assignment_group'));
		}
		//todo: Do something with the assignment group names
	});