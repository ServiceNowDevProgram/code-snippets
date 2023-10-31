var prb = new GlideRecord('problem'); //GlideRecord is main Oject and Problem is the Table name
prb.addQuery('active',true); //Filter the Active true records
prb.addQuery('category','software'); //Fetch records with category which has software
prb.query(); ////Query is execute in the table
while(prb.next()) ////Loop will runs on the table
{
gs.log(prb.number); //Printing problem records
}
