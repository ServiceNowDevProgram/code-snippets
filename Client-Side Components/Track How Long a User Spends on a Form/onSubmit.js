// onSubmit Client Script

    var formEndTime = new Date().getTime();  //get the current time
    var timeSpentMs = formEndTime - g_form.getValue('u_spent_time');   //get the duration of time spent
    var timeSpentSec = Math.floor(timeSpentMs / 1000);

    g_form.addInfoMessage("You spent " + timeSpentSec + " seconds on this form.");    // show the info or we can do multiple things related to reporting
    return true;
