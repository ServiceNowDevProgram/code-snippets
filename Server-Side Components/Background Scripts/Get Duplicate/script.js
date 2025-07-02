var dpchk = new GlideAggregate('task');               
dpchk.groupBy('number');                             
dpchk.addHaving('COUNT', '>', 1);
dpchk.query();
while(dpchk.next())	
{
		gs.print(dpchk.number);                               
}
