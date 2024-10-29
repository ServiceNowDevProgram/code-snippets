var changerecord = new GlideRecord('change_request');
changerecord.get('sys_id', 'a9e9c33dc61122760072455df62663d2' );

var requestedBy = changerecord.requested_by.getRefRecord();

if (requestedBy.isValidRecord()) {

	gs.print("User Name: " + requestedBy.user_name);
	gs.print("User Email: " + requestedBy.email);
}
else {
	gs.print("Caller record wasn't found");
}
