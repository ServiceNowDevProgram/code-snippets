There are instances where groups are created but remain without members for an extended period, making them ineffective.
This script helps identify such groups that have no members within a specified timeframe and make them inactive.

Scenario-
Deactivate the active groups which doesn't have members for last 6 months.
Approach-
1. A scheduled job runs daily or weekly to identify groups without members.
2. To track when a group becomes memberless, a Date field (e.g. u_memberless_date) is added to the sys_user_group table and populated with the current date when no members are found.
3. If members are added later, the field value is cleared.
4. Groups that remain memberless for over six months (based on the u_memberless_date) are automatically deactivated.
