Background Script — Copy Source User’s Groups to Specific Users

Working:
It retrieves all groups of the source user.
Loops through all active users (except the source).
Checks whether the user is already a member of that group.
If not, it inserts a new record in sys_user_grmember.

Note:
sourceUserSysId → sys_id of the user whose groups you want to copy.
The 3 entries in targetUserSysIds → sys_ids of the target users.
It checks for duplicates, so no errors even if the user is already in that group.
