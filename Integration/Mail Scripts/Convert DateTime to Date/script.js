(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {


    // Add your code here
    var date = new GlideDateTime(current.sys_created_on); //datetime object of created date of current record
    var con_date= date.getLocalDate(); // Gets the date from dateime object in user's time zone
    template.print(con_date); //prints the date in email body




})(current, template, email, email_action, event);
