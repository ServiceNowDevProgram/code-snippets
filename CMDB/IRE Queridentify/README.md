# Identifying and fetching a CI using IRE

This code snippet leverages `identifyCI()` and `GlideRecordUtil()`to identify and fetch a CI using the Identification and Reconciliation Engine. In this example we use lookup identification to make it a bit more sophisticated.

The code as-is will use the network adapters to identify the server. Replace *THIS NAME DOES NOT EXIST!* with **JEMPLOYEE-IBM* to use the name of the CI instead. The CI named **JEMPLOYEE-IBM* is a demo CI that comes with the standard PDI.

*Note*: this example should work with an zBoot PDI. However, for some reasons it seems like the values of the `install_status` field of the demo data network adapter are corrupted or something. In order to fix this, type `cmdb_ci_networt_adapter.list` in the menu filter, and change the *Status* field (`install_status`) of all 3 records to `Installed`.
