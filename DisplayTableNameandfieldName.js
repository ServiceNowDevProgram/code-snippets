var arr =[];
var getTableAndFieldNames = new GlideRecord('sys_dictionary');
getTableAndFieldNames.addEncodedQuery('internal_type!=collection');
getTableAndFieldNames.orderBy('name');
getTableAndFieldNames.query();
while(getTableAndFieldNames.next())
{
arr.push("Table Name : " + getTableAndFieldNames.name.toString() + ", Label Name : " +getTableAndFieldNames.column_label.toString()+ ", Backend Label Name : "+ getTableAndFieldNames.element.toString());
}

for(var i=0; i<arr.length; i++)
{
   gs.print(arr[i]);
}
