The script retrieves the top-level manager for the currently logged-in user  by traversing the manager hierarchy in the sys_user table.

It starts from the current user and moves up through each manager until it reaches a user who does not have a manager.

The script starts with the current user (e.g., Employee).

It checks if the user has a manager.

If yes, it moves up the hierarchy to the manager.

It repeats this process until it reaches a user who does not have a manager.

That user is considered the Top-Level Manager.
