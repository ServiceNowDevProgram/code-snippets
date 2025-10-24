/**
 * Script: Manager Email → Sys_id Map
 * Type: Transform Map Script (Run Script)
 *
 * Purpose:
 * This transform script builds an in-memory dictionary (map) that links
 * manager email addresses to their corresponding sys_ids in the `sys_user` table.
 *
 * Why:
 * During a data import or transform, multiple records may need to look up
 * the same manager repeatedly. Instead of running a GlideRecord query every time,
 * this preloads all manager sys_ids once for efficient lookup.
 *
 * Key Concept:
 * - `this.managerMap` is used instead of `var managerMap` so that the map
 *   persists across multiple transform runs (e.g., onBefore/transformRow/onAfter)
 *   within the same Transform Map execution context.
 * - Variables defined with `this` become properties of the transform script's
 *   execution object, allowing reuse across all functions available with the specific transform map pbject.
 *
 * Example usage in an onBefore/transformRow script:
 *   var managerSysId = this.managerMap[source.manager_email.toLowerCase()];
 */

(function runTransformScript(source, map, log, target /*undefined onStart*/) {
  // Build dictionary of Manager Emails → Sys_id
  this.managerMap = {};
  var grManagerUser = new GlideRecord("sys_user");
  grManagerUser.query();
  while (grManagerUser.next()) {
    managerMap[grManagerUser.email.toString().toLowerCase()] =
      grManagerUser.sys_id.toString();
  }
})(source, map, log, target);
