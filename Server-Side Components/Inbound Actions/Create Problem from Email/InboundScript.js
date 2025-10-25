(function runAction(/*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {
  // Create Problem
  var pro = new GlideRecord('problem');
  pro.initialize();
  pro.short_description = email.subject || "No Subject";
  pro.description = email.body_text || "No Description Provided";
  pro.caller_id = email.from;

  // Set default values
  pro.category = 'hardware';
  pro.impact = 3;
  pro.urgency = 3;

  var problemID = pro.insert();
  if (problemID){
    current.problem_id = problemID;
    current.update();
  }
  
})(current, event, email, logger, classifier);
  
