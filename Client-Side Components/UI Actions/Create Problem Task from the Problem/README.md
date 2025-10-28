UI Action Create Problem Task from the Problem

A UI Action in ServiceNow is a script that defines an action or button within the platform's user interface. 
It enables users to perform specific operations on forms and lists, such as creating, updating, or deleting records, or executing custom scripts. 
UI Actions enhance the user experience by providing functional buttons, links, or context menus.

Using this UI action script we can create a Problem task from a Problem and associate it to the current problem.

UI Action will be available as Form Button on the Problem Form.
When Clicked Problem Task will be Created and associated to the current Problem.

Short description of the problem task is "Problem Task Created for problem " + current.number
Same will be added to the Description as well.
sys_id of the current problem record will be added to the problem field of the Problem Task. This will create relation between Problem and Problem Task.
Problem Task Type will be General
