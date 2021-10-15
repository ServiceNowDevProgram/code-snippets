/*
Filter result from Table A based on conditions of a related table (Table B)

IMPORTANT: Need a Database view to get this to work
*/

var grTableA = new GlideRecord('<Table A>');
var grJoin = grTableA.addJoinQuery('<Database View>','<Table A ID>','<Database View Table A prefix plus ID>');
grJoin.addCondition('<Database View table prefix plus field>','<value>')
grTableA.query();
while(grTableA.next()) {
	gs.info('Number: ' + grTableA.getValue('<Table A field>'));
}
