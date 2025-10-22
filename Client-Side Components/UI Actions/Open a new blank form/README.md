UI Action - This script is server side script add it to the UI action to create a new blank form.

When clicked on it will create a New Blank form and will redirect user to this newly created blank form.

incident.do is used as URL paramenter will open new blank form for incident , we can change this to any other table ( for example - problem.do  will open new blank problem form)

action.setRedirectURL() is a method used in server-side scripting within UI Actions to redirect users to a specific URL after a UI action is performed. 
It is commonly used to navigate users to different records, forms, or list views after they have completed an action.
Syntax -  action.setRedirectURL(URL);
Parameters:
URL: The URL to which the user will be redirected. This can be a string representing a GlideURL object or a hardcoded URL. It must point to a valid ServiceNow page (record, list, form, etc.).
Return:
None. It performs a redirection after the script completes.

GlideURL is a class in ServiceNow used for constructing URLs dynamically in server-side scripts. 
It allows developers to programmatically create and manipulate URLs to redirect users, perform navigation, or link to specific ServiceNow resources (e.g., forms, lists, reports).
