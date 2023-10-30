The snippet can be used to export records from any table and then attach on another record. You could export records in any of the these formats (CSV, XLS, XLSX, PDF, JSON, XML, XSD, SCHEMA, RSS) from any table view based on an encoded query. If required, the attachment can be send out to users through a notification (with check include attachments).

Sample Usage:

//Export all active incidents from the ESS view into XLSX format 

gs.print(exportRecords('incident', 'b3f076504750210042bd757f2ede273f', 'active=true', 'ess', 'XLSX', 'Active Incidents.xlsx'));

//Export all active incident from the defaut view in JSON format

gs.print(exportRecords('incident', 'b3f076504750210042bd757f2ede273f', 'active=true', '', 'JSONv2', 'Active Incidents.json'));

//Export a record into PDF

gs.print(exportRecords('incident', 'b3f076504750210042bd757f2ede273f', 'sys_id=b3f076504750210042bd757f2ede273f', '', 'PDF', 'record.pdf'));


