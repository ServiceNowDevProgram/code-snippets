This script automatically creates key-value entries for Configuration Items (CIs) that belong to query-based CMDB groups, ensuring consistent tagging and service association within the CMDB.
It is particularly useful for maintaining Application-level key associations (key = "Application") dynamically — based on group membership from Query-Based Services (cmdb_ci_query_based_service).

This script automates the process of creating records in the cmdb_key_value table for all CIs belonging to query-based service groups (cmdb_ci_query_based_service) that are linked with CMDB groups.
It ensures that:
* Each CI gets a key-value pair where key = “Application” and value = <ServiceName> + “AS”
* No duplicate key-value entries are created for the same CI.


Build the Tag based mapping define the key and values for every application service and build the map,Here I am grouping CI's with DCI CI Groups.
