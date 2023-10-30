# How to fetch MRVS value using g_service_catalog

Use this onLoad catalog client script to fetch the MRVS variable value and hide the variable.  In this example, a catalog item for blocking multiple IP addresses on a firewall has a variable **address_type** with two choices - IPV4 and IPV6. The MRVS has two variables (ipv4_address and ipv6_address) for the respective address types. If the Address type field on the parent form is set to IPV4, the field IPV6 address is hidden on the MRVS.

It returns the value of the specified field on the catalog item form when used in a client script on multi-row variable sets (MRVS).

**Note: This method can only be called from the parent object, such as g_service_catalog.parent.getValue().**

## Use case

Use this method when an MRVS modal is open for editing or creating and you want to modify data within the MRVS based on the value of a field on the parent catalog item form. 
**For example:** when you need to modify the contents of the cells within an MRVS based on a check box on the parent form. You can also use this method to access the data of other MRVS elements within the same parent form.

* [Click here for script](pull_mrvs_variable_value.js)
