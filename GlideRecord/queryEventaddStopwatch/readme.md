Description below
1. Navigate to Event Table <em_event>
2. Applied the filter as 'Desscription is not empty' and 'Created' on as 'This Month' to query all events created in current month
3. Executed the filter to check the record count
4. Created a script to using encoded query at step '2' to apply on em_event table
5. Added a stopWatch() to measure the execution time of script when Gliding the event table
6. As a result it will show how much time it has take to execute the query when Event table is GLide to check the query performance for given filter. Helpful to check the table performance when indexes are applied to table
