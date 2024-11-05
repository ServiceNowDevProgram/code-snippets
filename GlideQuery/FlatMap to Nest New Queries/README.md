# Using FlatMap to Nest Queries

`flatMap` returns a Stream to a parent stream, that cause the parent stream to return the result of the nested Stream.  It is extremely useful for using the results of a query to create and return the results of a new query based on the original's results.

The provided example is slightly contrived, but exhibits this behavior of using the results of a query on one table to create a query on a second table, and then view the output.

It finds uses the `sys_user` table to find the `sys_id` for username = david.miller, then queries the incident table for incidents where the `caller_id` is David Miller's sys_id (from the first query).  The output is the result of the inner query.