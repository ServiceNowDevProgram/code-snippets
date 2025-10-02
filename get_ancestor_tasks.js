/**
 * getAncestorTasks — Return an array of parent task records up the chain.
 * @param {String} tableName — the name of the task table (e.g. “incident”)
 * @param {String} sysId — sys_id of the starting record
 * @param {Number} maxDepth — optional maximum depth to prevent infinite loops
 * @returns {GlideRecord[]} — array of ancestor GlideRecord objects, ordered from immediate parent up to root
 */
function getAncestorTasks(tableName, sysId, maxDepth = 10) {
    var ancestors = [];
    var seen = {};
    var depth = 0;

    var gr = new GlideRecord(tableName);
    if (!gr.get(sysId)) {
        return ancestors;  // no starting record
    }

    while (gr.parent && gr.parent.toString() && depth < maxDepth) {
        var parentId = gr.parent.toString();
        if (seen[parentId]) {
            gs.warn("getAncestorTasks: detected cycle at " + parentId);
            break;
        }
        seen[parentId] = true;

        var parentGr = new GlideRecord(tableName);
        if (!parentGr.get(parentId)) {
            gs.warn("getAncestorTasks: parent record not found: " + parentId);
            break;
        }
        ancestors.push(parentGr);
        gr = parentGr;
        depth++;
    }
    return ancestors;
}
