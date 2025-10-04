A UI Action in ServiceNow is a script that defines an action or button within the platform's user interface. 
It enables users to perform specific operations on forms and lists, such as creating, updating, or deleting records, or executing custom scripts. 
UI Actions enhance the user experience by providing functional buttons, links, or context menus.

In this UI action script when clicked Creates New blank incident form, from the incident. 

action.setRedirectURL() is a method used in server-side scripting within UI Actions to redirect users to a specific URL after a UI action is performed. 
It is commonly used to navigate users to different records, forms, or list views after they have completed an action.

Syntax -  action.setRedirectURL(URL);
Parameters:
URL: The URL to which the user will be redirected. This can be a string representing a GlideURL object or a hardcoded URL. It must point to a valid ServiceNow page (record, list, form, etc.).
Return:
None. It performs a redirection after the script completes.

GlideURL is a class in ServiceNow used for constructing URLs dynamically in server-side scripts. It allows developers to programmatically create and manipulate URLs to redirect users, perform navigation, or link to specific ServiceNow resources (e.g., forms, lists, reports).
