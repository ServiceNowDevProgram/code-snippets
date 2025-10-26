This script will identify all the retired CI and update the releationship by removing it from the CIs
 This is will query the cmdb_ci_rel table and fetch all ci with status as install status == 7 and parent install status == 7

 As result it will delete all CI relationship and update the delete entry by querying custom table u_deleteret_app
