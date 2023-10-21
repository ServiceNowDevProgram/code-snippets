# Objective
This ServiceNow business rule script is designed to automatically calculate the due date for a task based on its priority. It executes before the record is saved (Before Business Rule) and calculates the due date in hours, depending on the priority level of the task.

# Priority-to-Due-Date Mapping
```
var priorityToDueDate = {
    1: 4,    // High priority: Due in 4 hours
    2: 24,   // Medium priority: Due in 24 hours
    3: 72    // Low priority: Due in 72 hours
};
```
This section defines a JavaScript object called priorityToDueDate that maps priority values to due date intervals in hours. For example, if the task has a priority of 1 (High), its due date will be set to 4 hours from the current date and time.
Alternatively, we can store these mapping values in a custom table, allowing us to update them as necessary.

# Get Priority Value
```
var priority = current.priority;
```
This line retrieves the priority value from the current record and stores it in a variable called priority.

# Check Priority Validity and Mapping
```
if (priority && priorityToDueDate.hasOwnProperty(priority)) {
    // Code goes here
}
```
This if statement checks if the priority variable is defined (not null or undefined) and if it exists as a key in the priorityToDueDate mapping. This ensures that the priority value is valid and has a corresponding due date interval.

# Calculate Due Date
```
var dueDate = new GlideDateTime();
dueDate.addHours(priorityToDueDate[priority]);
```
If the priority is valid, a new GlideDateTime object is created, and the addHours method is used to add the appropriate number of hours (based on the priority) to the current date and time. This calculates the due date.

# Update Due Date Field
```
current.due_date = dueDate;
```
Finally, the due_date field in the current record is updated with the calculated due date.
