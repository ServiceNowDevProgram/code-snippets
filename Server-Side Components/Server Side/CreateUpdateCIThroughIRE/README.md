ServiceNow CMDB should be updated through the Identification and Reconciliation Engine. There are several legacy ways of populating CMDB and the most commonly used ways are via transform maps or through any external integration scripts. Whenver data is added to the CMDB, it should go through the IRE as it helps you maintain the quality of your CI data by avoiding duplicates and ensuring that only authorized source can updated the data in your CMDB. The code snippet allows you to update CMDB through IRE thereby reducing the maintanance effort required on your CMDB. You could call it from a transform map script, integration scripts or via any other scripted methods used to integrate.

Sample Usage
````
//This has the list of all CIs and its related CI that need to be added to CMDB
var items = [{
        "className": 'cmdb_ci_win_server',
        "values": {
            "name": 'xServerV1',
            "serial_number": "12342-drrrcf-3332dd-2222",
            "ip_address": "10.20.30.40",
            "mac_address": "ZFSTFS-XXJSDD-QWWJES-AJDH2D",
            "ram": "4096",
            "os": "Windows 2016 Datacenter"
        }
    },
    {
        "className": 'cmdb_ci_app_server_tomcat',
        "values": {
            "name": 'Tomcat@ip-10.20.30.40:8005',
            "version": '7.0.42',
            "install_directory": "sdd",
            "running_process_key_parameters": "ss",
            "server_port": "8005"
        }
    }
];

//This defines the relationship between the CIs mentioned in the items array and created the same in cmdb_rel_ci table
var relations = [{
    "child": 0,
    "parent": 1,
    "type": "Runs on::Runs"
}];

createOrUpdateCIThroughIRE(items, relations, "ServiceNow");
````````
