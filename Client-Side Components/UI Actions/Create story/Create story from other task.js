createStory();

function createStory() {

  // (1) Copy item fields into a new story
  var story = new GlideRecord("rm_story");
  story.priority = current.priority;
  story.short_description = current.short_description;
  story.assignment_group = current.assignment_group;
  story.assigned_to = current.assigned_to;
  story.description = current.description;
  story.work_notes = current.work_notes;
  story.type="Development";
  story.opened = current.opened;
  story.opened_by = current.opened_by;
  story.product = null;
  story.state = -6;  //default to draft
  story.original_task = current.sys_id;
  var storySysID = story.insert();
  
  current.agile_story = storySysID;
  current.update();

  // (2) Redirect webpage to the new story (Ensure story displayed in scrum view)
  gs.addInfoMessage(gs.getMessage("Story {0} created", story.number)); 
  action.setRedirectURL(story);
  var redirectURL = action.getRedirectURL();
  redirectURL = redirectURL.replace("sysparm_view=", "sysparm_view=scrum");
  action.setRedirectURL(redirectURL);
  action.setReturnURL(current);
}
