var ciRel = new GlideRecord('cmdb_rel_ci');
ciRel.addQuery('parent', current.sys_id);
ciRel.query();
while(ciRel.next())
{
  var ci = new GlideRecord('cmdb_ci');
  ci.addQuery('sys_id', ciRel.child);
  ci.query();
  if(ci.next())
  {
    ci.operational_status = current.operational_status;
    ci.update();
  }
}
