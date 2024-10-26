function getRecordXML(tableName, sysId) {
    var gr = new GlideRecord(tableName); // Replace 'incident' with your table name
    gr.get(sysId);
    var xmlDoc = new XMLDocument();
    var baseTag = xmlDoc.createElement('incident');
    var fields = gr.getFields();

    var fieldNames = [];
    for (var i = 0; i < fields.size(); i++) {
        fieldNames.push(fields.get(i).getName());
    }
    fieldNames.sort();

    fieldNames.forEach(function(fieldName) {
        var fieldValue = gr.getValue(fieldName);
        var fieldTag = xmlDoc.createElement(fieldName);
        fieldTag.setTextContent(fieldValue);
        baseTag.appendChild(fieldTag);
    });
    gs.info(xmlDoc.toString());
    return xmlDoc.toString();
}
