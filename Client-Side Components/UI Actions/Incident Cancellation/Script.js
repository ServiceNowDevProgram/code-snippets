function cancelincident() {
    confirm("Do you want to cancel the incident ?");
    gsftSubmit(null, g_form.getFormElement(), 'cancel_inc');
}
if (typeof window == "undefined")
    cancellingincident();

function cancellingincident() {
    current.state = 8;
    current.work_notes = "Cancelled this incident";
    current.update();
	action.setRedirectURL(current);
}
