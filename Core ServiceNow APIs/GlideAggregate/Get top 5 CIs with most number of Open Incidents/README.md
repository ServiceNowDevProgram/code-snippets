Use-case:
**Fetch Top 5 CIs with the most number of Open Incidents along with the count**

Type of Script writted: **Background Script**

**How the code works:**
The code uses the GlideAggregate API to efficiently calculate and retrieve the results -
1. A GlideAggregate query is initiated on the Incident table. The query is restricted to only active Incidents.
2. The query instructs the database to COUNT records grouped by the configuration item(cmdb_ci).
3. Furthermore, the records are instructed to be in descending order of number of incidents related to one CI, also a limit
   of 5 records are applied to be fetched.
4. The query is executed and a loop is iterated over these 5 records to fetch and print
   the CI name and its corresponding incident count.
