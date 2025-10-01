var gr = new GlideRecord('incident');
gr.chooseWindow(0, 10); // Fetch the first 10 records
gr.query();
while (gr.next()) {
  gs.info(gr.number);
}
