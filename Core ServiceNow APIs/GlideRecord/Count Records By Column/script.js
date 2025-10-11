// Count records in a table, grouped by a certain column and output as CSV for further data analysis

// Table to count records in
var count_table = 'sys_attachment';
// Column to group the count by
var count_column = 'table_name';
// (Optional) Limit results by query
var encoded_query = 'table_nameLIKEsys';

count_gr = new GlideAggregate(count_table);
count_gr.addAggregate('COUNT', count_column);
count_gr.orderByAggregate('COUNT', count_column);
count_gr.groupBy(count_column);
if (encoded_query != '')
    count_gr.addEncodedQuery(encoded_query);
count_gr.query();
var csv_output = "\n" + count_column + ",count\n";
while (count_gr.next()) {
    var colDispValue = count_gr.getDisplayValue(count_column);
    if (colDispValue == "") { colDispValue = "(empty)"; }
    csv_output += colDispValue + "," + count_gr.getAggregate('COUNT', count_column) + "\n";
}

gs.info(csv_output);
