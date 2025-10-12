var CSVReaderUtil = Class.create();
CSVReaderUtil.prototype = {
    initialize: function() {
        this.midServer = 'YOUR_MID_SERVER_NAME'; // Replace with your MID Server name
    },

    // Method to read CSV file from MID Server
    readCSVFile: function(filePath) {
        try {
            // Create ECC Queue input record (Probe)
            var probe = new GlideRecord('ecc_queue');
            probe.agent = 'mid.server.' + this.midServer;
            probe.topic = 'Command';
            probe.name = 'read_csv_file';
            probe.source = 'ServiceNow';
            probe.queue = 'output';

            var scriptPath = 'cat ' + filePath;
            probe.payload = '<?xml version="1.0" encoding="UTF-8"?><parameters><parameter name="name" value="' + scriptPath + '"/></parameters>';

            var probeId = probe.insert();

            gs.info('CSV Read Probe sent with sys_id: ' + probeId);
            return probeId;

        } catch (e) {
            gs.error('Error sending probe: ' + e.message);
            return null;
        }
    },

    // Method to check and retrieve the response
    getCSVResponse: function(probeId) {
        var gr = new GlideRecord('ecc_queue');
        gr.addQuery('response_to', probeId);
        gr.addQuery('state', 'processed');
        gr.orderByDesc('sys_created_on');
        gr.query();

        if (gr.next()) {
            var payload = gr.payload + '';
            return this.parseCSVPayload(payload);
        }
        return null;
    },

    // Parse the CSV data from payload
    parseCSVPayload: function(payload) {
        var csvData = [];
        try {
            // Extract CSV content from XML payload
            var xmlDoc = new XMLDocument2();
            xmlDoc.parseXML(payload);
            var content = xmlDoc.getNode('//stdout');

            if (content) {
                var lines = content.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        csvData.push(lines[i].split(','));
                    }
                }
            }
        } catch (e) {
            gs.error('Error parsing CSV payload: ' + e.message);
        }
        return csvData;
    },

    type: 'CSVReaderUtil'
};
