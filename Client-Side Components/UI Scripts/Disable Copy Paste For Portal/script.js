/*
Disable Copy Paste on Portal Pages.
UI Type : Service Portal/Mobile.
*/
document.addEventListener('copy', function(e) { //event listner for copy.
    alert("Copy Operation is prevented on this page."); // alert for copy
    e.preventDefault(); // prevent copy
});

document.addEventListener('paste', function(e) { //event listner for paste.
    alert("Paste Operation is prevented on this page."); //alert for paste
    e.preventDefault(); // prevent paste
});
