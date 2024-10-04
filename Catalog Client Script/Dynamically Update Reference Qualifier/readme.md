When we have a reference variable that is used in a (single row) variable set, sometimes we want to update the Reference qualifier only for specific Catalog Item(s).

In this example, I have a Configuration item (named v_configuration_item) reference variable (cmdb_ci table) in a single row variable set that has been included in a number of Catalog Items.  The simple Reference qualifier for this variable is:
sys_class_name=cmdb_ci_ip_router^ORsys_class_name=cmdb_ci_ip_switch

Let's say for one particular Catalog Item, I also want to include the class of VPN (cmdb_ci_vpn).

To do this without having to create another variable with the new qualifier and hiding the variable set variable, there are some preparation steps, including those which ensure that the other Catalog Items using the variable set are not disrupted:

1) Change the advanced reference qualifier on the variable to: **javascript: gs.getProperty("sr.ref_qual.ci");**
using a System Property Name of your choice

2) Create a System Property with the same Name used in the Reference qualifier, leaving the Value empty.

3) Add the included 'Variable Set onLoad' Catalog Client Script that applies to the Variable set with...

4) The included Client Callable Script Include to update the System Property Value to the Reference Qualifier that was replaced.  This Script Include uses parameters for the System Property Name and Value, so it can be re-used in every instance of this solution.

Now that the other Catalog Items using the variable set are still working as they were, all you need to do to update the Reference qualifier on certain Catalog Item(s) is:

5) Add the included 'Catalog Item onLoad' Catalog Client Script that applies to the Catalog Item. Set the Order of this script to a high number (10,000) so that it runs after the variable set one.

This solution works in both the Native UI and Service Portal. The Catalog Client scripts contain an alternate Service Portal only approach in the commented if block that can be used in conjunction with the native UI approach in the else block. This alternate Service Portal solution was developed in collaboration with Chris Perry.
