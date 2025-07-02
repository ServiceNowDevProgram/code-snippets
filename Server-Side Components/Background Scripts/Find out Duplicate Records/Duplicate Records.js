var gr = new GlideAggregate(incident); 
gr.addAggregate('COUNT', number); 
gr.groupBy(number); 
gr.addHaving('COUNT', '>', 1); 
gr.query(); 
while (gr.next()) { 
    gs.print(gr.getValue(number) + ' has ' + gr.getAggregate('COUNT', field) + ' duplicate records ');
}
