*************
This script will query the group table and look for groups with inactive members. The script will replace the inactive manager with the oldest active member of the group.

Logs: If no active members are there in group //gs.info("Group " + grp.name + " does not have any active user");

After manager is replaced : gs.info("Group " + inactiveMgrGrp.name + " manager changed to " + getOlderGroupMember(inactiveMgrGrp).name);

*************
