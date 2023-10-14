var gr = new GlideQuery('incident');
gr.where('active', true)
  .where('priority', '1') // '1' represents high priority
  .count();

gs.info('Number of High-Priority Incidents: ' + gr.getCount());
