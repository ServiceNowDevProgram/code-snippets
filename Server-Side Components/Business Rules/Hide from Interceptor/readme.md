How often you come across cases where 'Private Task' or any other task available from the list needs to be disabled for handful of users (users who are ITIL users but from XYZ department) from the interceptor that shows up when 'New' button is clicked on the Task table.
This can be controlled by creating a 'Query' Business Rule on Answer (sys_wizard_answer) table. Script will be used in Business Rule to achieve the same.
Private Task is just an example as the point here is to help understand how to control something that shows up in the interceptors needs to be made available/disabled.
