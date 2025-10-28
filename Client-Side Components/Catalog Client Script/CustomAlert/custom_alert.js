function onLoad() {
    // Function to show a custom link in a GlideModal
    function showCustomLinkInGlideModal() {
        // Create an instance of GlideModal using the 'custom_alert_box' UI page
        // The second parameter 'true' indicates that the modal should be a dialog,
        // and '600' sets the width of the modal to 600 pixels.
        var gm = new GlideModal("custom_alert_box", true, 600);

        // Set the modal's title to anything you want
        gm.setTitle('Important Information'); //for e.g. Important Information
        
        // Set a preference for the modal indicating the type of alert
        // This can be used to style the modal or control its behavior.
        // available choices {info, danger, warning, success}
        gm.setPreference('alertType', 'danger');

        // Custom HTML content to be displayed in the modal
        // This includes a paragraph and a link to an external website.
        var htmlContent = '<p>Please visit the following link:</p>' +
            '<a href="https://example.com" target="_blank">Click here to go to Example.com</a>';

        // Set the HTML content of the modal using the 'infoText' preference.
        // We disable escaping since we're providing our own HTML.
        gm.setPreference('infoText', htmlContent);

        // Render the modal on the screen
        gm.render();
    }

    // Call the function to display the modal when the form loads
    showCustomLinkInGlideModal();
}
