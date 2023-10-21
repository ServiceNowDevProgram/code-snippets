1. the business rule will create a group in target instance when a new group is created in source instance.
2. It passes the required fields like group name, manager, type of thee group and sys_id of the group to target instance.
3. To meet this requirement, we need to create a Outbound Rest Message that requires Authentication type(basic) and a basic auth profile.
4. A HTTP POST method should also be created when we place the end point of the target instance.
5. If the outbound rest message is executed successfully, then the HTTP Status code returned will be 201.
