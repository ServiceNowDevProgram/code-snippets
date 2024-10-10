// Business Rule: Assign Incident Based on Business Hours
// Trigger: Before Insert
// Table: incident

var currentHour = new GlideDateTime().getHourPart();
if (currentHour >= 9 && currentHour <= 17) { // Business hours
    current.assignment_group = 'IT Support Group Sys ID';
} else {
    current.assignment_group = 'After Hours Support Group Sys ID';
}
