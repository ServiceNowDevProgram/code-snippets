// Auto-calculate Due Date based on priority Business Rule (Before BR)
// This business rule calculates the due date based on task priority.

(function executeRule(current, previous /*, display*/) {

    // Define priority-to-due-date mapping (in hours)
    var priorityToDueDate = {
        1: 4,    // High priority: Due in 4 hours
        2: 24,   // Medium priority: Due in 24 hours
        3: 72    // Low priority: Due in 72 hours
    };

    // Get the priority value from the task
    var priority = current.priority;

    // Check if priority is valid and mapping exists
    if (priority && priorityToDueDate.hasOwnProperty(priority)) {
        // Calculate the due date
        var dueDate = new GlideDateTime();
        dueDate.addHours(priorityToDueDate[priority]);

        // Update the due date field
        current.due_date = dueDate;
    }

})(current, previous);
