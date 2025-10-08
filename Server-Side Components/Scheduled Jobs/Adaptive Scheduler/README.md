🗓️ Adaptive Scheduler

📘 Overview

The Smart Quarterly Scheduler automates report execution for quarterly business reviews. It ensures that scheduled reports never fall on weekends or Fridays, maintaining consistent and reliable delivery.

🧩 Problem Statement

The business requires a quarterly report to run on the 2nd day of specific months (February, May, August, and November). However, when the 2nd day falls on a Friday or weekend, the client team will be typically on leave and may miss reviewing urgent reports.
This results in communication delays and missed insights during critical business periods.

💡 Solution

This script dynamically checks whether the 2nd day of the quarterly month is a Friday or weekend:

If yes → the report automatically runs on the 5th day.

If no → the report runs as usual on the 2nd day through another Scheduled Report.

It uses GlideDateTime logic to determine execution dynamically within the Scheduled Report Condition.

🚀 Benefits

⏰ Minimizes manual scheduling effort

✅ Ensures reports always run on valid business days

📊 Maintains consistent quarterly performance insights

🔁 Completely automated logic without admin dependency
