This client script dynamically controls field visibility, auto-calculates priority, 
and validates user input on the Incident form based on category, impact, and urgency — all without using a Script Include.

it runs whenever the Category field value changes on the form.

1.Validate form fields before saving (example: block submission if “Impact” or “Urgency” is empty).
2.Auto-calculate “Priority” based on “Impact” and “Urgency.”
3.Hide or show fields depending on “Category.”
4.Dynamically filter “Assignment Group” choices based on “Department.”

Uses:
Runs when Category changes on the Incident form.
Dynamically shows/hides the Serial Number field.
Auto-calculates Priority purely on the client side (no server calls).
Displays inline error messages or alerts based on user input.
Enforces logic that prevents invalid combinations.
