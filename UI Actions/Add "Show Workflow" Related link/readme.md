There are many cases where,we would have workflows on custom tables or non task tables , where we would like to see the "Show Workflow" Related Link for ease of accessibility to the workflow.
The shared code will help show this related link on any rable record that has a workflow associated with it.

Below has to be set for this to work on UI action form:

•	Table: Select the table that you would like this UI action to be available on (preferably table with workflows)

•	Onclick : showWorkflow()

•	Active : True

•	Show Update : True

•	Client : True

•	Form Link : True

•	Condition : new global.Workflow().hasWorkflow(current)
