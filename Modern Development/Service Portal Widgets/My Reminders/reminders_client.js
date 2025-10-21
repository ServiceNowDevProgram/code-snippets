function($scope) {
  var c = this;

  // Object to hold data for the new reminder form
  c.newReminder = {};

  // Special object for the sn-record-picker directive
  c.taskField = {
    displayValue: '',
    value: '',
    name: 'task'
  };

  // Function to submit the new reminder
  c.createReminder = function() {
    // Check if the form is valid before submitting
    if ($scope.reminderForm.$invalid) {
      return;
    }

    // Set the task sys_id from the record picker into our submission object
    c.newReminder.task = c.taskField.value;
    c.data.newReminder = c.newReminder;

    // Set an action for the server to identify the request
    c.data.action = 'create_reminder';

    // Call the server script to insert the record
    c.server.update().then(function(response) {
      // Clear the action and the form model after successful submission
      c.data.action = undefined;
      c.newReminder = {};
      c.taskField.displayValue = '';
      c.taskField.value = '';

      // Refresh the reminder list by reloading server data
      c.server.get().then(function(response) {
        c.data = response.data;
      });
    });
  };
}
