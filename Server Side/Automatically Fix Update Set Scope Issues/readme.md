There are many use cases when ServiceNow Developers need to work on batched update sets and as part of developing childe update sets, sometimes customer updates get captured in wrong scope as part their implementations. As of now, there is not an OOB way to fix update set scoping issues in this use case.

This automation peforms following to find a way of taking in a parent/batch update set:

•	Lookup all children, all updates in children.

•	Determine scope issues with updates.

•	Create new update set in correct scopes.

•	Move updates to those new update sets.

•	Associate them with parent/batch.

•	Stop action on completion of update sets if there are any scope issues found and direct the user to click on the Fix Scope button.

This functionality contains following objects:


-	Business rule to abort transaction if scoping issues are found in batched update sets.
-	Script include which does job of valiation of scoping issues conflict as well as logic for fixing batch scope issues.
-	UI action which can be used by developers to fix scoping issues conflict.
