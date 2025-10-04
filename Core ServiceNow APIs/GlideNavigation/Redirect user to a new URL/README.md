# g_navigation.open(url, target)
This method redirects users to a new URL. You can specify the frame where the content should load (e.g., the current frame or a specific one).

### Example: Open All Active Incidents of the Caller
 
     var callerID = g_form.getValue("caller_id");
     var url = "incident_list.do?sysparm_query=active=true^caller_id=" + callerID;
     g_navigation.open(url, "_blank");

This code opens a list of all active incidents for a specific caller in the current frame. It’s perfect for quickly accessing incidents tied to a particular user without leaving your current workflow.
