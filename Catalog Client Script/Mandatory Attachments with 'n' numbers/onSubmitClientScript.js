function onSubmit() {
	//Type appropriate comment here, and begin script below

var count = 3; //Pass the number to ensure given number of attachments are added
	if(window == null){
		// Service portal validation, Make sure Isolate Script is set to False
		if(this.document.getElementsByClassName('get-attachment').length != count) {
			alert('You must add 3 attachments before submitting this request.');
			return false;
		}
	}
	else{
		// Platform View
         var length = $j("li.attachment_list_items").find("span").length;
		if(length != count){
			alert('You must add 3 attachments before submitting this request.');
			return false;
		}
	}
}


