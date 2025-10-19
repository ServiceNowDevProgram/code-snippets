Users Without Manager - ServiceNow Background Script

This ServiceNow Background Script fetches all active users who do not have a manager assigned and provides a list of their names along with their Sys IDs, plus the total count of such users.

Features

Lists all active users without a manager.

Displays user display names along with their Sys IDs.

Provides a total count at the end.

Fully server-side, runs directly in Background Script.

Wrapped in a self-invoking function to avoid variable scope issues.

Usage

Log in to your ServiceNow instance.

Navigate to: System Definition → Scripts - Background.
Click Run Script.

View the output in the System Logs → All (gs.info) to see:

A list of users without a manager

Their Sys IDs

Total count

Example Output
Users without manager are: 
John Doe (Sys ID: 46d1f2f0db123300f0a12345c0a12345)
Jane Smith (Sys ID: 46d1f2f0db123300f0a12345c0a67890)
...
Total users without manager: 42

Notes

This script only fetches active users (active=true).

You can modify the query to add additional filters if required (e.g., by department or role).

Ideal for administrators to quickly identify users without assigned managers for audits or reporting purposes.
