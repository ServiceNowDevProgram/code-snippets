ServiceNow MID Server CSV Reader

This utility enables reading CSV files from MID Server machines through the ECC Queue mechanism.

Overview

The solution uses a Script Include named CSVReaderUtil.js to send and receive data between the ServiceNow instance and the MID Server.
It supports executing read operations on local CSV files stored on the MID Server filesystem.

Steps to Use

Create the Script Include
Create a new Script Include named CSVReaderUtil.js in ServiceNow.
This Script Include handles communication with the MID Server and parsing of CSV data.

Trigger the Script from a Background Script

Use the following example to read data from a CSV file located on the MID Server:

var csvUtil = new CSVReaderUtil();

// Send probe to the MID Server to read the CSV file
var probeId = csvUtil.readCSVFile('/path/to/your/file.csv');

// Wait a few seconds to allow the MID Server to process the request
gs.sleep(5000);

// Retrieve the response from the ECC Queue
var csvData = csvUtil.getCSVResponse(probeId);

gs.info('CSV Data: ' + csvData);
