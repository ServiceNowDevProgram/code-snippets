function getCancelledSctasks(ritm){
var svtaskGA = new GlideAggregate("sc_task");
svtaskGA.addEncodedQuery("parent="+ritm+"^state=4^ORstate=7");
svtaskGA.addAggregate("COUNT");
svtaskGA.query();
if(svtaskGA.next())
  {
  return svtaskGA.getAggregate("COUNT");
  }
  }
