# Display a 2-choice confirmation dialog
When you press the button on the Form screen, a two-choice dialog is displayed.

Click the Complete button to execute Serverside processing.

## Please set the following values.
* UI Action 
  * Name: Example Dialog
  * Table: incident (anything) 
  * Action name: example_dialog
  * Client: ture
  * Form button: ture
  * Onclick: onClickExampleDialog()
  * Script

```javascript
function onClickExampleDialog() {
    var dialogClass = typeof GlideModal != 'undefined' ? GlideModal : GlideDialogWindow;
    var dialog = new dialogClass('glide_modal_confirm');
    dialog.setTitle('Dialog title');
    dialog.setPreference("focusTrap", true); // Restrict focus from moving out of Dialog
    dialog.setPreference('body', 'Approve this change?');
    dialog.setPreference('buttonLabelCancel', 'Cancel'); // Cancel button label
    dialog.setPreference('buttonLabelComplete', 'Complete'); // Complete button label
    dialog.setPreference('buttonClassComplete', 'btn btn-destructive'); // Complete button CSS
    dialog.setPreference('onPromptComplete', dialogComplete.bind(this)); // Complete button function
    dialog.setPreference('onPromptCancel', dialogCancel.bind(this)); // Cancel button function
    dialog.render();
    return true;
}

// Complete button function
function dialogComplete() {
    //Press Submit Button and call UIAction(Server side 'example_dialog') again.
    gsftSubmit(null, g_form.getFormElement(), 'example_dialog');
}
// Cancel button function
function dialogCancel() {
    //alert('Dialog Cancel');
}

//Judge Server side
if (typeof window == 'undefined') {
    serversideTask();
}
// Server side function
function serversideTask() {
    current.update();
    gs.info('Serverside Task');
    action.setRedirectURL(current);
}
```
