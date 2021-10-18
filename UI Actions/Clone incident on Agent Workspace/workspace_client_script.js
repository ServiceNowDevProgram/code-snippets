function onClick() {
getMessage("Are you sure you want to Clone this Incident?", function (msg) {
		g_modal.confirm(getMessage("Confirmation"), msg, function (confirmed) {
			if (confirmed) {
				g_form.submit('clone_incident');
			}
		});
	});
}
