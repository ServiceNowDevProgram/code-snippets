var table = [
  "cmdb_ci_netgear",
  "cmdb_ci_firewall_network",
  "cmdb_ci_ip_firewall",
  "cmdb_ci_switch",
  "cmdb_ci_ip_router",
  "cmdb_ci_computer",
  "cmdb_ci_hardware",
  "cmdb_ci_lb",
  "cmdb_ci_lb_interface",
  "cmdb_ci_lb_pool",
  "cmdb_ci_lb_pool_member",
  "cmdb_ci_lb_service",
  "cmdb_ci_vlan",
  "cmdb_ci_server",
  "cmdb_ci_linux_server",
  "cmdb_ci_win_server",
  "cmdb_ci_ups",
];

for (var i = 0; i < table.length; i++) {
  gs.print("<<<<<-------START TABLE------->>>>>");
  gs.print("TABLE " + table[i]);
  getFields("alm_asset");
  gs.print("<<<<<-------END TABLE------->>>>>\n\n");
}

function getFields(table) {
  var i = 0;

  var gr = new GlideRecord("sys_dictionary");

  gr.addQuery("name", table);

  gr.query();
  gs.print("Row, Field name, Display name");
  while (gr.next()) {
    i = i + 1;
    gs.print("Field " + i + ": " + gr.element + " (" + gr.column_label + ")");
  }
}
