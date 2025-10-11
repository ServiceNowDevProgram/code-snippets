# Access g_form instance inside Agent Workspace from DevTools Console
When developing forms in ServiceNow it can be useful to try stuff out directly in the DevTools Console.
In UI16 this was pretty straightforward because g_form was available globally, Agent Workspace makes this a little bit more complicated.
So this script provides access to the g_form object of the currently active tab in a Workspace.

Just copy the Script in the DevTools Console and run `var g_form = getGlideFormAW()` 
now you should be able to do stuff like `g_form.setValue("short_description", "Lorem ipsum")`