var gr = new GlideRecord('incident');
if (gr.get('sys_id_of_record')) {
  gs.info('Incident link: ' + gr.getLink());
}
