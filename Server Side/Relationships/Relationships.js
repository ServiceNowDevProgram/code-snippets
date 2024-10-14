var tabis=new GlideRecord('sys_ui_bookmark');
tabis.addEncodedQuery('sys_created_by=abcd^sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()');
tabis.query();
gs.print('Count is '+countis); //comment out if needed
while(tabis.next())
{
var countis=0;
tabis.deleteMultiple(); //uncomment when gs.print() gives desired results
countis++;
}
