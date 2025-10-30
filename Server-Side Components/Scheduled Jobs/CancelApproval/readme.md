Scheduled Script Execution: Auto-cancel RITM if group manager approval pending after 30 days

This script:
- Finds RITM records older than 30 days
- Checks if any group manager approvals are still pending (state='requested')
- If so, cancels the RITM (sets state to 'Cancelled')
Usage:
- Schedule this script to run daily.
