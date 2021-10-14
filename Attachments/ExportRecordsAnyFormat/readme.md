The snippet can be used to export records from a table and then attach on another record. The attachment can be send out to users through a notification (check include attachments) if required.

Sample Usage:

//Export all active incidents from the ESS view into XLSX format 
gs.print(exportRecordToPDF('incident', 'b3f076504750210042bd757f2ede273f', 'active=true', 'ess', 'XLSX', 'Active Incidents.xlsx'));

//Export all active incident from the defaut view in JSON format
gs.print(exportRecordToPDF('incident', 'b3f076504750210042bd757f2ede273f', 'active=true', '', 'JSONv2', 'Active Incidents.json'));

//Export a record into PDF
gs.print(exportRecordToPDF('incident', 'b3f076504750210042bd757f2ede273f', 'sys_id=b3f076504750210042bd757f2ede273f', '', 'PDF', 'record.pdf'));


