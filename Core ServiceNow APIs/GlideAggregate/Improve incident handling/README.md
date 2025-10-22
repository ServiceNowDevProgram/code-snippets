Suppose you want to gather data about incident resolution in your system. 
Specifically, you need to find the total number of incidents, the average time to resolution (in hours), and the number of incidents per assignment group. 
This information can help analyze the efficiency of different groups and improve incident handling.

Below are the added Aggregations:

inc.addAggregate('COUNT') gets the total count of resolved incidents.
inc.addAggregate('AVG', 'calendar_duration') calculates the average calendar duration for incident resolution (measured in hours).
inc.addAggregate('COUNT', 'assignment_group') counts incidents per assignment group, and ga.groupBy('assignment_group') groups the result by assignment group to produce totals per group.

Result:
- It fetches total counts, average resolution time, and group-specific counts.
- Logs the total number of resolved incidents and the average resolution time.
- For each assignment group, it logs the group’s sys_id and the corresponding incident count.

Benefits of Using GlideAggregate:
- Reduces the number of queries and records you need to process, as it performs calculations at the database level.
- Works well with large datasets, making it suitable for summary reports and dashboards.
- Allows grouping and multiple aggregations (e.g., AVG, COUNT, MIN, MAX) on various fields in a single query.
  
This GlideAggregate example provides a consolidated view of incident resolution statistics, which can aid in optimizing group efficiency and improving response times.
