This business rule automatically creates a Problem record when there are 5 or more incidents linked to the same Configuration Item (CI) within the last 24 hours.
How it works technically:
-It first checks if the current Incident has an associated CIThen, it counts the number of incidents created in the last day for that CI.
-If the count is 5 or more, it looks for any open Problem records related to the same CI.
-If no open Problem exists, it creates a new Problem with a short description indicating recurring incidents on that CI.
-Finally, it logs the creation of the Problem.
