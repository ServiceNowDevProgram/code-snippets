identificationReconciliationRule();

function identificationReconciliationRule() {

   var gdtToday = new GlideDate();
   var todayDate = gdtToday.getDisplayValue();

   var payload = {
  items: [{
    className:'cmdb_ci_computer',
    values: {
      name: '382735F5AD9E493',
      serial_number:'28398596-3000301',
      u_glide_date: todayDate,
      asset_tag: 'P1000148'
    }
  }]
};

//'ServiceNow' is the 'Data Source' which we have defined in the reconciliation rules for the table [cmdb_ci_computer]

   var input = new JSON().encode(payload);
   var output = SNC.IdentificationEngineScriptableApi.createOrUpdateCI('ServiceNow', input);
   gs.info(output);
}
