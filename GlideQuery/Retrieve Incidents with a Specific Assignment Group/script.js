var gr = new GlideQuery('incident');
gr.where('active', true)
  .where('assignment_group', 'IT Support')
  .query();

while (gr.next()) {
  // Process each incident
  gs.info('Incident Number: ' + gr.getValue('number'));
}
