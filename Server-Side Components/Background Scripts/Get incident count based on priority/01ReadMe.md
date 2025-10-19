Incident Priority Counter — ServiceNow Script:

This script counts the number of incidents for each priority in your ServiceNow instance and outputs the results in the system logs. It’s useful for analyzing incident distribution, identifying trends, and generating quick reports on priority levels.

Purpose / Use Case:

Quickly see how many incidents exist at each priority level (Critical, High, Medium, Low, etc.).

Useful for monitoring workloads or checking data consistency.

Can serve as a template for other field-based analytics in ServiceNow.

How It Works:

Queries all records in the Incident table.

Loops through each record and retrieves the priority field (display value).

Counts how many incidents exist for each priority.

Outputs the results to system logs (gs.info()).

Installation / Usage:

Navigate to System Definition → Scripts – Background.

Paste the script into the editor.

Click Run Script.

Check System Logs → All to see the output in the format:

Priority: Critical | Count: 10
Priority: High | Count: 25
Priority: Medium | Count: 30
Priority: Low | Count: 5
Priority: No Priority Set | Count: 2

Notes:

The script uses display values for priorities, so it’s easy to read.

If you have a large number of incidents, consider adding query filters (e.g., gr.addActiveQuery()) to improve performance.

Can be modified to count other fields, like category, assignment group, or state.
