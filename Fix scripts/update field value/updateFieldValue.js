var grTable = new GlideRecord('table_name');
grTable.addEncodedQuery('add query according to your requirement'); // on table list filter condition right click and copy query
grTable.query();
gs.info('Table Records to update: ' + grTable.getRowCount());
while (grTable.next()) {
    grTable.field_name = '1';   // field which needs to be updated
    grTable.update();
}
