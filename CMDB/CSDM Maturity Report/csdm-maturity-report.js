var csdm = {
    Core: {
        "task": "Task",
        "cmdb_ci": "CMDB",
        "cmdb_rel_ci": "CI Relationship",
        "alm_asset": "Asset"
    },
    Foundation: {
        "cmdb_group": "CMDB Group",
        "cmdb_model": "Product Model",
        "ast_contract": "Contract",
        "core_company": "Company",
        "business_unit": "Business Unit",
        "cmn_department": "Department",
        "cmn_location": "Location",
        "sys_user_group": "Group",
        "sys_user": "User",
        "sys_user.active=true": "User"
    },
    Design: {
        "cmdb_ci_business_capability": "Business Capability",
        "cmdb_ci_information_object": "Information Object",
        "cmdb_ci_business_app": "Business Application"
    },
    Technical_Services: {
        "cmdb_ci_service_technical": "Technical Service",
        "service_offering.service_classification=Technical Service": "Technical Service Offering",
        "cmdb_ci_service": "Service",
        "cmdb_ci_service.service_classification=Technical Service": "Techinical Service",
        "cmdb_ci_service.service_classification=Application Service": "Application Service",
        "cmdb_ci_service.service_classification=infrastructure Service": "infrastructure Service",
        "cmdb_ci_service.service_classification=End User Service": "End User Service",
        "cmdb_ci_service_auto": "Application Service",
        "cmdb_ci_service_discovered": "Mapped Application Service",
        "cmdb_ci_service_calculated": "Calculated Application Service",
        "cmdb_ci_service_by_tags": "Tag Based",
        "cmdb_ci_query_based_service": "Dynamic CI Groups",
        "svc_ci_assoc": "Service CI Associations"
    },
    Sell_Consume: {
        "cmdb_ci_service.service_classification=Business Service": "Business Service",
        "service_offering.service_classification=Business Service": "Business Service Offering",	
        "sc_catalog": "Catalogs",
        "sc_cat_item_producer": "Catalog Items Producer",
        "sc_cat_item.active=true^sys_class_name=sc_cat_item": "Catalog Items"
    }
};


var getCount = function(tblQuery) {
    var count = 0;
    var tblQueryArr = tblQuery.split('.');
    var tbl = tblQueryArr[0]
    var query = tblQueryArr[1] || '';
    gs.info(tbl);
    var agg = new GlideAggregate(tbl);
    if (query != '') {
        agg.addEncodedQuery(query);
    }
    agg.addAggregate('COUNT');
    agg.query();
    if (agg.next()) {
        count = agg.getAggregate('COUNT');
    }
    return count;
};
var out = '';
Object.keys(csdm).forEach(function (domain) {
    Object.keys(csdm[domain]).forEach(function (tblQuery) {
        var count = getCount(tblQuery);
        out += domain + ',' + csdm[domain][tblQuery] + ',' + tblQuery + ',' + count + '\n';
    });
});

gs.info(out);
