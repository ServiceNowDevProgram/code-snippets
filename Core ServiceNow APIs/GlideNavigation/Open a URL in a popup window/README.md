# g_navigation.openPopup(url, name, features, noStack)
This method open a URL in a popup window with options to customize the popup’s behavior (e.g., resizable, scrollbars, etc.).

### Example: Open Child Incidents in a Popup

     var parentIncidentID = g_form.getUniqueValue();
     g_navigation.openPopup('incident_list.do?sysparm_query=parent_incident=' + parentIncidentID, 'Child Incidents', 'resizable,scrollbars,status',true);

This code opens a popup window to display all incidents that are children of a specific parent incident. It’s great for visualizing relationships between incidents without cluttering the main interface.
