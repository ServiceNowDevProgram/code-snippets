On a reference variable in a multi-row variable set, sometimes you want the reference qualifier to include the value of a variable that is part of the Catalog Item, not within the MRVS.

In this simplified example, I have a Manager (v_manager) reference variable (sys_user table) that belongs to the Catalog Item.  In the MRVS, I have an Employee (v_employee) reference variable (sys_user table).  I only want to be able to select user records that are active, and the Manager is the user I selected on the Catalog Item variable.

1) Set the advanced reference qualifier on the MRVS variable to
   javascript: gs.getProperty("sr.mrvs.ref_qual.emp");
   using a System Property Name of your choice

2) Use the included onLoad Catalog Client Script that applies to the Variable set, or you can also use this onChange of the Catalog Item variable in a script that applies to the Catalog Item.

3) Add the included Client callable Script Include for the Catalog Client Script to call via GlideAjax.  This Script Include uses parameters for the System Property Name and Value, so it can be re-used in every instance of this solution.

This solution works in both the Native UI and Service Portal.  The script contains an alternate Service Portal only approach in the commented if block that can be used in conjunction with the native UI approach in the else block.  This alternate Service Portal solution was developed in collaboration with Chris Perry.
