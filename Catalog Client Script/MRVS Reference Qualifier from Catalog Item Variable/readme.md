*** This solution uses g_list, so it works in Service Portal (and I assume ESC) only, not the native UI / Service Catalog interface ***<br>
Developed in collaboration with Chris Perry


On a reference variable in a multi-row variable set, sometimes you want the reference qualifier to include the value of a variable that is part of the Catalog Item, not within the MRVS

When using this script that applies to the Variable set, not the Catalog Item, leave the Reference qualifier field on the MRVS variable empty 

In this simplified example, I have a Manager (v_manager) reference variable (sys_user table) that belongs to the Catalog Item.  In the MRVS, I have an Employee (v_employee) reference variable (sys_user table).  I only want to be able to select user records that are active, and the Manager is the user I selected on the Catalog Item variable.
