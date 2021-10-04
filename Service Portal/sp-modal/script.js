var html = "<p>Test</p>";
	// Use spModal to pop the HTML
	if (html) {
		spModal.open({
			title: 'This is test Modal: ' + newValue,
			message: html,
			buttons: [
				{label:'OK', primary: true}
			],
		});
	}
