This business rule will update the group manager role on group manager change on Insert, Update, Delete
Steps:
  1. When new manager is updated from for the current group
  2. Current role of the manager will be updated and removed
  3. New Manager detail provided will be validated and it will assign the role to new manager 
  4. Configuration Details:
    - When to run:
        - After
        - Order:100
        - Operation: Insert, Update, Delete
     - Condition:
          current.manager.changes() || current.operation() == "delete"
     - Table: Group [sys_user_group]
