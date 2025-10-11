triggerTransform: function(importSetRecSysID) {

    var transformSysId = gs.getProperty('tmap.tag.sys.id'); // store the sys_id of transform map

    var transformWorker = new GlideImportSetTransformerWorker(importSetRecSysID, transformSysId); // Calling OOB method to run transform map pass the importset sysId
    transformWorker.setBackground(true); // run asynchronously
    transformWorker.start();
}
