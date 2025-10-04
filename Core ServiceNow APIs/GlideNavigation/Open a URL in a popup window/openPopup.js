var parentIncidentID = g_form.getUniqueValue();
g_navigation.openPopup('incident_list.do?sysparm_query=parent_incident=' + parentIncidentID, 'Child Incidents', 'resizable,scrollbars,status', true);
