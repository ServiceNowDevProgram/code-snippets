This business rule prevents users from submitting too many incidents in a short time, acting as a rate-limiting mechanism to reduce spam or misuse of the incident form.

What It Does:
-Checks how many incidents the same caller has submitted in the last 10 minutes.
-If the number of incidents is 3 or more, the rule:
-Blocks the current incident from being submitted.
-Displays an error message:
"You have submitted too many incidents in a short time. Please wait before submitting more."
