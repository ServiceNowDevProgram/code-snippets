function openInInstance(){

    //Since we are in a client action, get the current record utilizing the URL
    if(!top.location) return;
    var href = top.location.href.toString();

    //Grab record from current URL
    var recordHref = href.split('.com/')[1];

    //Open the record in the new instance
    window.open('https://[Target Instance].service-now.com/nav_to.do?uri=' + recordHref, '_blank');

}