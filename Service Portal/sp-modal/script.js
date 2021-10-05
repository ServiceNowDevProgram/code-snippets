api.controller=function(spModal) {
/* widget controller */
var c = this;

var html = "<p>Test</p>";
// Use spModal to pop the HTML
spModal.open({
title: 'This is test Modal: ',
message: html,
buttons: [
	{label:'OK', primary: true}
]
});
};
