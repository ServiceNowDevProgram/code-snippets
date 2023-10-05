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
