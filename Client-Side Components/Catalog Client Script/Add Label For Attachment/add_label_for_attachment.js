function onLoad() {
    var attachmentElement = top.document.querySelectorAll('[ng-if="c.showAttachments()"]');
    
	if (attachmentElement[0]) {
		var label = top.document.createElement('label');
		label.innerHTML = 'LABEL COMES HERE';
		attachmentElement[0].prepend(label);
	}
}