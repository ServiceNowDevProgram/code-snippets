//It can be used within a Business Rule - After Insert
(function executeRule(current, previous /*null when async*/) {

	insertAttachment();

})(current, previous);

function insertAttachment() {

	var gsa = new GlideSysAttachment(); 
	var attachmentId = gsa.write(current, "fileName.txt", 'text/plain', "some data");

}
