Create Problem from Inbound Email Actions

1. Create a Inbound Email Action for Problem record.
2. Select the Target Table as Problem [problem].
3. Select Action type as Record Action.
4. In the When to run Tab select Type as "New", we can required roles as well.
5. Add the required conditions -  "Subject -> contains -> Problem".
6. Write the script in the Actions Tab.
7. Glide the Problem Table and assign the short_description from the email subject else "No Subject".
8. And assign the description from the email body_text else "No Description Provided".
9. Assign the caller_id from the email.from.
10. Set the default values such category, impact, urgency etc.
11. Followed by it will create the Problem whenever an email subject contains the Problem.
