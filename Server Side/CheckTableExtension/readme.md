The snippet validates whether a child table is extended from a parent table. You could provide both the table names as input and it would respond back with a boolean output.

Sample Usage

gs.info(isTableExtended("cmdb_ci", "cmdb_ci_win_server"));  //true

gs.info(isTableExtended("cmdb_ci", "cmdb_ci_hardwares"));   //false
