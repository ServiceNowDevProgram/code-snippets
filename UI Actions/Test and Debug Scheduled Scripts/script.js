try{
		
	var evaluator = new GlideScopedEvaluator();  
	evaluator.evaluateScript(current, 'script');
	action.setRedirectURL(current);
	
}	
catch(e){
	gs.addInfoMessage(e);
}
