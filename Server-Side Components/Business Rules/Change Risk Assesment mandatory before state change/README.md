This is a code snippet which can be used in a Business rule to prevent the state of Change Request Move from New state when there is no risk Assesment attached to the Change Request.
Table : change_request When: Before Update: True Conditions : state || CHANGESFROM || New AND state || is not || Cancelled AND type || is one of || Normal,Emergency
Note: This script is helpful for all the tables and their related tables which has assesmenets enabled, The BR should be created on related table and filters can be added accordingly
