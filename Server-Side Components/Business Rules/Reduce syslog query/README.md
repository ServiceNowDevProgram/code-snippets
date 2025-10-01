# Description

Unexperienced users open large tables like `syslog`, `sysevent` or any CMDB table with several millions of records just by entering TABLENAME.list into the application navigator - wondering why it takes minutes to load the results.

The reason: Without any reduction to a time window a so-called "full table scan" is performed behin the scenes to determine the the number of records in that table. 

To protect the user from having their session locked for several minutes, my business rule adds a portion to the query that restricts search results to records created in the last 15 minutes.

If the user already added any condition for the `sys_created_on` field then no query changes are done.

# Business Rule

**Table:** `syslog`

**When:** Query

**Condition:** `gs.getSession().isInteractive()`

# Result

![Result](./business_rule.png)
