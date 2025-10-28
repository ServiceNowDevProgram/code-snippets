function onSubmit() {
	//Type appropriate comment here, and begin script below

var count = 3; //Pass the number to ensure given number of attachments are added
var alertMsg="You must add "+count+" attachments before submitting this request.";
	if(window == null){
		// Service portal validation, Make sure Isolate Script is set to False
		if(this.document.getElementsByClassName('get-attachment').length != count) {
			spModal.alert(alertMsg);
			return false;
		}
	}
	else{
		// Platform View
         var length = $j("li.attachment_list_items").find("span").length;
		if(length != count){
			alertWindow(alertMsg);
			return false;
		}
	}
}
function alertWindow(message) {
    var modal = new GlideModal("glide_warn");
    modal.setTitle("Attachment issue");
    modal.setPreference("title", message);
    modal.render();
}