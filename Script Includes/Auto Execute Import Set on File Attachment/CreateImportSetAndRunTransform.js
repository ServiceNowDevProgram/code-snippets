var createImportSet = Class.create();
createImportSet.prototype = {
    initialize: function() {
    },

  //The below function can be called from an Action/Business Rule or a Script Action
	loadImportSet: function(dataSourceID) {  
        // Get Datasource Record  
        var dataSource = new GlideRecord("sys_data_source");  
        dataSource.get(dataSourceID);  
          
        // Process data source file  
        var loader = new GlideImportSetLoader();  
        var importSetRec = loader.getImportSetGr(dataSource);  
        var ranload = loader.loadImportSetTable(importSetRec, dataSource);  
        importSetRec.state = "loaded";  
        importSetRec.update();  
          
        // Transform import set  
        this._doTransform(importSetRec); 
    },  
      
    _doTransform: function(set){
        var importSetRun = new GlideImportSetRun(set.getUniqueValue());
        var importLog = new GlideImportLog(importSetRun, set.data_source.name);
        var ist = new GlideImportSetTransformer();

        ist.setLogger(importLog);
        ist.setImportSetRun(importSetRun);
        ist.transformAllMaps(set);
     },
    type: 'createImportSet'
};
