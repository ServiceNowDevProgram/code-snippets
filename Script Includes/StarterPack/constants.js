/*
Usage: In any script block you can use "StarterPackConstants.<SOMETHING>"
*/

var StarterPackConstants = Class.create();

StarterPackConstants.INSTANCE = gs.getProperty('instance_name'); //usage: var instanceString = 'The current Instance is ' + StarterPackConstants.INSTANCE;
StarterPackConstants.ACTIVEQUERY = 'active=true'; //usage: gr.addEncodedQuery(StarterPackConstants.ACTIVEQUERY);
