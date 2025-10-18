Tsble: sn_customerservice_case
When to run: Before update
condition : additional comment changes

Use case:

When a user adds additional comments on a case, the system needs to determine if the case requires further attention from the assigned user. This determination depends on who updated the case and their roles.
If the update is made by an automated system user (sys_updated_by == 'system'), no action is taken.
If the update is made by a user who holds one of the specified roles (e.g., customer service roles or fulfillers), and this user is not the current assigned user, then the case should be flagged as needing attention (needs_attention = true).
If the update is made by the currently assigned user, and needs_attention was previously set to true, it should now be cleared (needs_attention = false) because the assigned user has presumably addressed the issue.
This ensures that when others contribute to the case, the assigned user knows to review it, but when the assigned user updates the case, the attention flag is cleared.
