var ibGr = new GlideRecord("sn_install_base_item");
ibGr.addEncodedQuery("RLQUERYsn_install_base_m2m_affected_install_base.install_base,>0,case.active=true^ENDRLQUERY");
ibGr.query();

while (ibGr.next()) {
  // Do something
}
