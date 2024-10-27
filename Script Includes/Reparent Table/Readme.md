# Reparent Table

This function `reparentTable` is to reparent the existing table to the another parent.

This `glide.rollback.blacklist.TableParentChange.change` property can restrict user to reparent the table so in script we first set it to **false** before reparenting and later on changed it to its initially value once reparenting is done.
