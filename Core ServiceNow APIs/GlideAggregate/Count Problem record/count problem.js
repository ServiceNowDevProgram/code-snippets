var probCount = new GlideAggregate('problem');
probCount.addActiveQuery(); //active record
probCount.groupBy('assignment_group'); //Per Assignment Group wise
probCount.addAggregate('COUNT');
probCount.query();
while(probCount.next())
{
    gs.print("Count of Problem records :" +probCount.getAggregate('COUNT') + " " + "Per Assignment Groupwise :" + probCount.getDisplayValue('assignment_group')); //Display Problem record per assignment group
}
