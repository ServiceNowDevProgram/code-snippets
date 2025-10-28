// Before Business rule applied on Glide Record Table ex. story[rm_story].


(function executeRule(current, previous /*null when async*/) {

	// Auto Apply Template on Glide Record Table: Story
	var templateName = "Story creation"; //replace template name
    current.applyTemplate(templateName);

})(current, previous);
