Scenario: You are wanting to send a notification to someone whenever they are added to a list of people. 

Application: Create an event in the event registry. Then, create a business rule. Set the name and table, advanced = true. 

When to run: 
When = after, update = true, conditions = watch list (replace with applicable field name) | changes

Advanced tab: insert the snippet