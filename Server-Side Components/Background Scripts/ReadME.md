This background script captures all the groups which are active and do not have any members added to the group.

What your script does correctly

Queries all active groups from sys_user_group.

For each group, it checks sys_user_grmember to see if there’s at least one member.

If no member exists (!br.next()), it pushes the group name into arr.

Finally, prints all such group names, comma-separated.

So logically, it works fine and will print all active groups with zero members.