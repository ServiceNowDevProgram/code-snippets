The script retrieves the top-level manager for the currently logged-in user  by traversing the manager hierarchy in the sys_user table.

It starts from the current user and moves up through each manager until it reaches a user who does not have a manager.
