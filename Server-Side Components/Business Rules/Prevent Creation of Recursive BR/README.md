Using current.update() in Business rule is not recommended from servicenow due to following reasons-
1. Before- Records will be saved automatically after BR executes so using current.update is redundant
2. After- Triggers all "before" BRs again causing recursion calls and performance issue
3. Async- Same issue as in After
4. Query- current object doesn't exist and will cause error
5. Display- Runs before UI is rendered. Using current.update doesn't make sense.

To avoid such scenarios, a business rule can be configured on the 'sys_script' table will trigger an error message and
block the creation of any new business rule if it detects the use of current.update() within the script.

Runs: onBefore insert.
