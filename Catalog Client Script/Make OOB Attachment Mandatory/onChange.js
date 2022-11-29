function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == 'No') {
		setAttachmentMandatory(false);
        return;
    }

    if (newValue == 'Yes') setAttachmentMandatory(true);
}