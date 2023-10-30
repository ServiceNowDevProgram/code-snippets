## Set Aggregate Window

**setAggregateWindow** method is used wtihin GlideAggregate. GlideAggregate enables creating database aggregation queries.
The GlideAggregate class is an extension of GlideRecord and provides database aggregation (AVG, COUNT, GROUP_CONCAT, GROUP_CONCAT_DISTINCT, MAX, MIN, STDDEV, SUM) queries and this enables creating database aggregation queries.

This method is used to limit the number of rows from the table to include in the aggregate query. For example current script Prints the count of each category for the first ten records in the Incident [incident] table.
