## Get Display Value of MultiRow Variableset (MRVS)

While there are different ways to do this, the easiest of them is to leverage an out of box script named **'VariableUtil'**. 

The script is present in the global scope and contains an function named getDisplayValue aptly. This function seems to work on both the normal variable as well as multirow variableset. You just need to pass the sysid of the variable or the multirow variableset and its corresponding value.

**new VariableUtil().getDisplayValue('sys_id of variable or MRVS','value of variable/MRVS');**
