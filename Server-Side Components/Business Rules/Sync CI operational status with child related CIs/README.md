
# Sync CI operational status with child related CIs

**Use case** : Whenever any configuration item becomes operational or non-operational, then all the CIs which are related to the current CI as a child in cmdb_rel_ci table will also update their operational status

*info* : This method is to achieve the above use-case just with business rule

**Solution** : Create a `Async` business rule on `cmdb_ci` table with `update` checkbox checked. 

*condition* : operational status CHANGES

Follow the script present in [script.js](https://github.com/ServiceNowDevProgram/code-snippets/blob/patch-1/Business%20Rules/Sync%20CI%20operational%20status%20with%20child%20related%20CIs/script.js)
