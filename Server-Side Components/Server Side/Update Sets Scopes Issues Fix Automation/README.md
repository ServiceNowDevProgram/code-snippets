ServiceNow Developers work with update set batching and many times it happens that customer updates gets captured in a wrong scope. As of Xanadu release, there is no way to fix these scoping issues in child updates.
This utility will perform following and implement a way of taking in a parent/batch update set:

-	Navigate all children, all updates in children.

-	Determine scope issues with updates.

-	Create new update set in correct scopes.

-	Move updates to those new update sets.

-	Associate them with parent/batch.

-	Stop action on completion of update sets if there are any scope issues found and direct the user to click on the Fix Scope button.



This functionality has following:

-	Business rule to abort transaction if scoping issues are found in batched update sets.
-	Script include which does job of scoping issues conflict as well as logic for fixing batch scope issues.
-	UI action which can be used by developers to fix scoping issues conflict.

![image](https://github.com/user-attachments/assets/0a7c5127-7c15-4bb6-bf96-17de3b81a334)

![image](https://github.com/user-attachments/assets/87872d20-f2c2-42ac-8c69-d095cc7ddaf3)

![image](https://github.com/user-attachments/assets/94890946-395c-476f-a9b9-b81e94a801c9)

![image](https://github.com/user-attachments/assets/96bcea79-a06e-4891-aace-3bbba81e9cb4)





