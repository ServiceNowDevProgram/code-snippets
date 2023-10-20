(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var queryParams = request.queryParams;

    var grChoice = new GlideRecord('sys_choice');
    grChoice.addQuery('name', queryParams.name);
    grChoice.addQuery('element', queryParams.element);
    grChoice.query();

    var filterList = [];
    while (grChoice.next()) {
        var label = grChoice.getValue("label");
        var value = grChoice.getValue("value");
        var object = {
            code: value,
            country: label
        };
        filterList.push(object);
    }

    return filterList;
})(request, response);