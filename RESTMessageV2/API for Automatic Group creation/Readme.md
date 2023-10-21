1.The after insert business rule on sys_user_group in the source instance, will create a group in target instance when a new group is created in source instance.
2.It passes the required fields like group name, manager, type of the group to target instance.
3.End point to create group in target instance is https://instance_name.service now.com/api/now/table/sys_user_group
4.A HTTP POST method should should be used to create a record in the target instance.
