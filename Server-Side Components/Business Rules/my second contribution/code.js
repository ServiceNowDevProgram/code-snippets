var gr = new GlideRecord('incident');
gr.addQuery('caller_id',current.caller_id);
gr.addQuery('short_desc',current.short_desc);
gr.query();
if(gr.next()){
  gs.addErrorMessage('Duplicate inc found for this caller');
  current.setAbortAction(true);
}
