var op = new GlideRecord('incident');
op.addInActiveQuery();
op.query();
while(op.next())
{
gs.log('Incident Number :'+op.number);
gs.log('Incident Description : '+op.short_description);
}
