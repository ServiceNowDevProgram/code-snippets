README — Client Script: Validate Interaction Resolution
📌 Purpose
This Client Script ensures proper validation when resolving an Interaction record in ServiceNow.
It prevents a user from marking an Interaction as Closed Complete without proper justification.

🎯 What It Does

When a user attempts to submit the form:
✔ Allows submission only if:
Interaction Type is "walkup"
And Related Task Boolean is true

OR

✔ If work notes are provided for First Contact Resolution (FCR)
❌ Prevents submission if:
State = Closed Complete
Work Notes are empty
And no related task condition is met

🧠 Validations Performed
Field	Condition	Action
state	closed_complete	Trigger validation
type	walkup AND u_boolean_no_related_task = true	Submission allowed ✅
work_notes	Must not be empty	Show error & stop submission ❌
🔔 User Feedback

If work notes are missing:
Displays inline field message

Shows popup alert:
"Provide Worknotes for FCR Interaction"

📍 Script Location

Client Script → Type: onSubmit()
Applicable to Interaction table (interaction)

📌 Script Code
//Client Script to validate an Interaction record is resolved with out any related record created.
function onSubmit() {
    var relatedTask = g_form.getValue('u_boolean_no_related_task');
    var state = g_form.getValue('state');
    var type = g_form.getValue('type');
    var workNotes = g_form.getValue('work_notes'); // Get the value of work notes

    // Clear previous field messages
    g_form.clearMessages();

    // Check if state is changing to 'Closed Complete'
    if (state == 'closed_complete') {
        // Check additional conditions
        if (type == 'walkup' && relatedTask == 'true') {
            return true; // Allow form submission
        } else if (!workNotes) { // Check if work notes is empty
            g_form.showFieldMsg('work_notes', 'Provide Worknotes for FCR Interaction', 'error');
            alert('Provide Worknotes for FCR Interaction');
            return false; // Prevent form submission
        }
    }
    return true; // Allow form submission for other states
}

✅ Benefits

Maintains consistent resolution standards
Ensures justification/documentation for FCR interactions
Reduces incorrect closure of requests without related actions



