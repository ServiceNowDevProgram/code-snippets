unsyncCI();

function unsyncCI() {

    var grAsset = new GlideRecord("alm_hardware");
    grAsset.addEncodedQuery('sys_id='); //replace query with rrequired list
    grAsset.query();
    if (grAsset.next()) {
        var grCI = new GlideRecord("cmdb_ci");
        grCI.addQuery("sys_id", grAsset.ci);
        grCI.setLimit(1);
        grCI.query();
        if (grCI.next()) {
            grCI.asset = '';
            grCI.setWorkFlow(false);
            grCI.update();
        }
        grAsset.ci = '';
        grAsset.setWorkFlow(false);
        grAsset.update();
    }
}
