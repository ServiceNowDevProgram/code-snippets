# safeGetBySysId

> Safely fetch a GlideRecord by `sys_id` and log clearly if not found.

**Use case:**  
I often need to fetch a single record inside background scripts or Script Includes and don’t want to keep repeating the same `gr.get()` + null checks. This helper makes it a one-liner and keeps logs human-readable.

```javascript
/**
 * safeGetBySysId(table, sysId)
 * Returns GlideRecord object or null if not found.
 */
function safeGetBySysId(table, sysId) {
  if (!table || !sysId) {
    gs.warn('safeGetBySysId: Missing parameters.');
    return null;
  }

  var gr = new GlideRecord(table);
  if (gr.get(sysId)) {
    return gr;
  }

  gs.warn('safeGetBySysId: No record found in ' + table + ' for sys_id ' + sysId);
  return null;
}

// Example:
var inc = safeGetBySysId('incident', '46d12b8a97a83110eaa3bcb51cbb356e');
if (inc) gs.info('Found incident: ' + inc.number);
