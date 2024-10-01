function onLoad() {
    var mgr = g_service_catalog.parent.getValue('v_manager'); //Catalog Item Variable Name
    var filter = g_list.get('v_employee'); //MRVS variable name
    filter.setQuery('active=true^manager=' + mgr);
}
