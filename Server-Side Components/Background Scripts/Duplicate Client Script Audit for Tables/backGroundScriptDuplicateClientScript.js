// Target table
var targetTable = 'change_request'; // < can be incident, change_request , wm_order etc.... > 

// counters
var seen = {};
var duplicateCount = 0;
var totalCount = 0;

// Query ACTIVE Client Scripts sorted by creation date (oldest → newest)
var gr = new GlideRecord('sys_script_client');
gr.addQuery('table', targetTable);
gr.addQuery('active', true);
gr.orderBy('sys_created_on');
gr.query();

gs.print('--- Duplicate Client Script Audit for table: ' + targetTable + ' ---');
gs.print('Sorted by creation date (oldest → newest)');
gs.print('MODE: Detection only (no updates performed).');
gs.print('');

// group Client Scripts
while (gr.next()) {
    totalCount++;

    // Build unique trigger key
    var key = gr.name + '_' + gr.ui_type + '_' + gr.type + '_' + gr.order;
    if (gr.type == 'onChange') key += '_' + gr.field;

    // Build readable script info
    var info = gr.name +
           ' | Type: ' + gr.type +
           (gr.type == 'onChange' ? ' | Field: ' + gr.field : '') +
           ' | Order: ' + gr.order +
           ' | Created: ' + gr.sys_created_on.getDisplayValue() +
           ' | Sys_id: (' + gr.sys_id + ')';


    // If first occurrence consider it as key
    if (!seen[key]) {
        seen[key] = {
            original: info,
            duplicates: []
        };
    }
    // If key already exists put into duplicate
    else {
        seen[key].duplicates.push(info);
        duplicateCount++;
    }
}

// grouping the scripts 
var groupsWithDuplicates = 0;
for (var key in seen) {
    var group = seen[key];
    if (group.duplicates.length > 0) {
        groupsWithDuplicates++;

        // Original
        gs.print(group.original);

        // Summary line
        // gs.print('This ' +  seen.key + 'script has ' + group.duplicates.length + ' duplicate' );
		var trimmedKey = key.split('_')[0];
		gs.print('This ' + trimmedKey + ' script has ' + group.duplicates.length + ' duplicate' + (group.duplicates.length > 1 ? 's.' : '.'));

		// Separator
        gs.print('--------------------------------------');
    }
}

// no duplicates found
if (groupsWithDuplicates === 0) {
    gs.print('No duplicate client scripts found for this table.');
}

// ✅ Final summary
gs.print('\n--------------------------------------');
gs.print('✅ SUMMARY for table: ' + targetTable);
gs.print('Total active scripts scanned: ' + totalCount);
gs.print('Originals with duplicates: ' + groupsWithDuplicates);
gs.print('Total duplicates detected: ' + duplicateCount);
gs.print('--------------------------------------');
