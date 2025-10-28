var grSecure = new GlideRecordSecure('<table_name>');
grSecure.addEncodedQuery('<query>');
grSecure.query();
while(grSecure.next())
{
<action>
}
