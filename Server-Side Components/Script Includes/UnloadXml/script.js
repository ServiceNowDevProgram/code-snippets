var UnloadXml = function(table, encQuery) {
	var xmlStr = '<unload>';
	var grTable = new GlideRecord(table);
	grTable.addEncodedQuery(encQuery);
	grTable.query();
	while (grTable.next()) {
		var xml = new GlideRecordXMLSerializer();
		var result = xml.serialize(grTable);
		result = result.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
		xmlStr += result.replace('<' + table + '>', '<' + table + ' action="INSERT_OR_UPDATE">') + '\n';
	}
	xmlStr += '</unload>';
	return xmlStr;
};