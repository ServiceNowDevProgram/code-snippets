// Business rule that runs Before Insert on any record to get the type of device the user is raising the incidents or issues
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var device = GlideMobileExtensions.getDeviceType(); 

    if (device == 'doctype')
    {
        current.u_type_of_device = 'Laptop / Desktop'; // I have added my custom field, it can be added for the required field
    }
   if (device == 'm')
    {
        current.u_type_of_device = 'Mobile'; // I have added my custom field, it can be added for the required field
    }

})(current, previous);
