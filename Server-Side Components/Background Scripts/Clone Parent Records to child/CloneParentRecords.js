/* 
 * This script copies records from a parent table into a child table, optionally keeping a reference (link) to the parent record.  
 * This Script Uses Immediately Invoked Function Expression (IIFE) — meaning the script runs immediately once loaded.
 */
(function() {
    var parentGR = new GlideRecord('x_parent_table');
    parentGR.addQuery('your Query');
    parentGR.query();

    while (parentGR.next()) {
        // Create a record in the child table
        var childGR = new GlideRecord('x_child_table');
        childGR.initialize();

        // Copy parent fields (example fields)
        childGR.short_description = parentGR.short_description;
        childGR.description = parentGR.description;

        // If you want to maintain parent reference
        childGR.parent = parentGR.sys_id;

        childGR.insert();
    }

    gs.info('Records from parent table copied into child table successfully!');
})();