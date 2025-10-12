/*
Prevent right-click on portal for portal pages.
This will secure the site code, prevent users from saving images etc.
Ideal for high security organisations.

UI Type : Mobile/service portal.
*/
(function() { // self invoking function
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent right-click operation.
        alert("Right-Click Prevented for Security Reasons."); // alert message shown on right click.
    });
})();
