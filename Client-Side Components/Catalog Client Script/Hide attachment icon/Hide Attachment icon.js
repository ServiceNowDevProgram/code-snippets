//Hide attachment icon on catalog item
function onLoad() {
    var document = document || top.document;
    (jQuery || top.jQuery)("#sc_attachment_button, #catItemTop > div > div.wrapper-md.row.no-margin.ng-scope > label").hide();
}
