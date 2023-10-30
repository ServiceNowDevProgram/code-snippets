/*
The g_service_catalog API enables you to access data in a multi-row variable set (MRVS) when a model is open.
This API is available in all environments, such as, Service Portal, Now Platform, Workspace, and Now® Mobile.
*/

function onLoad() {
  if (g_service_catalog.parent.getValue("address_type") == "ipv4") {
    g_form.setValue("ipv4_address", "XX.XX.XX.XX");
    g_form.setVisible("ipv6_address", "false");
  }
}
