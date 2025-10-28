triggerDataSource: function() {

    var dataSourceSysId = gs.getProperty('ds.tag.based.sys.id'); //Store the sysId of DataSource from system property

    var grDataSource = new GlideRecord('sys_data_source');
    if (grDataSource.get(dataSourceSysId)) {
        var loader = new GlideImportSetLoader(); //OOB Method to load
        var importSetRec = loader.getImportSetGr(grDataSource);
        var ranload = loader.loadImportSetTable(importSetRec, grDataSource);
        importSetRec.state = "loaded";
        importSetRec.update();
        return importSetRec.getUniqueValue();
    }
},
