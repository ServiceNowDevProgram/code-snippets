/**
 * This function is useful for debugging the transform maps by triggering in the foreground
 * @param {String} importSetId sys_id of sys_import_set
 * @returns 
 */
function executeAllTransformMapsOnImportSetId(importSetId) {
    if(!importSetId) return;
    var grImportSet = new GlideRecord('sys_import_set');
    if(!grImportSet.get(importSetId)) return;
    var Transform = new GlideImportSetTransformer(); 
    return Transform.transformAllMaps(grImportSet);
}

var importSetId = '';
executeAllTransformMapsOnImportSetId(importSetId);