How it Code work Step by Step

Trigger:
This script runs onLoad (when the Incident form is opened).
It only applies to the Incident table.
Get current hour:
new Date().getHours() → fetches the current system hour (0–23 format).
Example: 9 = 9 AM, 15 = 3 PM, 20 = 8 PM.
Condition (Ternary Operator):
If hour is < 12 → Morning
Else if hour < 18 → Afternoon
Else → Evening
Add Info Message:
g_form.addInfoMessage(...) shows a friendly banner on top of the form.
Example output:
Morning (9 AM) → “Good Morning! Please provide the details of your issue.”

Evening (8 PM) → “Good Evening! Please provide the details of your issue.”
