{
  "result": {
    "taskId": "6dea3cdeec974462a7e751f414235ec6",
    "taskNumber": "RITM0106176",
    "state": "Open",
    "stage": null,
    "approval": "Requested",
    "taskType": "sc_req_item",
    "taskShortDescription": "Request the creation, modification, or removal of a network firewall rule or AWS Security Group rule",
    "additionalInfo": "Testing our RITM Variable API",
    "variableCount": 4,
    "multiRowVariableCount": 2,
    "variables": [
      {
        "name": "Rule Type",
        "value": "both",
        "displayValue": "Both"
      },
      {
        "name": "Application Group Impacted",
        "value": "16de082f69ab40bd95999cb6d691e2ea",
        "displayValue": "My Application"
      },
      {
        "name": "Project or Effort",
        "value": "API Testing",
        "displayValue": "API Testing"
      },
      {
        "name": "Description",
        "value": "Testing our RITM Variable API",
        "displayValue": "Testing our RITM Variable API"
      }
    ],
    "multiRowVariables": [
      {
        "name": "AWS Security Group Rules",
        "rowCount": 3,
        "rowCollection": [
          [
            {
              "name": "Action",
              "value": "add",
              "displayValue": "Add Rule"
            },
            {
              "name": "Rule Type",
              "value": "inbound",
              "displayValue": "Inbound"
            },
            {
              "name": "AWS Account",
              "value": "some_account",
              "displayValue": "Some Account"
            },
            {
              "name": "Security Group",
              "value": "sg-123456",
              "displayValue": "sg-123456"
            },
            {
              "name": "Protocol",
              "value": "tcp",
              "displayValue": "TCP"
            },
            {
              "name": "IP Address",
              "value": "100.100.100.1",
              "displayValue": "100.100.100.1"
            },
            {
              "name": "Port(s)",
              "value": "500",
              "displayValue": "500"
            },
            {
              "name": "Temporary",
              "value": "false",
              "displayValue": "false"
            },
            {
              "name": "Expiration Date",
              "value": "",
              "displayValue": ""
            }
          ],
          [
            {
              "name": "Action",
              "value": "add",
              "displayValue": "Add Rule"
            },
            {
              "name": "Rule Type",
              "value": "outbound",
              "displayValue": "Outbound"
            },
            {
              "name": "AWS Account",
              "value": "my_account",
              "displayValue": "My Account"
            },
            {
              "name": "Security Group",
              "value": "sg-blahblahblah",
              "displayValue": "sg-blahblahblah"
            },
            {
              "name": "Protocol",
              "value": "tcp",
              "displayValue": "TCP"
            },
            {
              "name": "IP Address",
              "value": "200.200.100.1",
              "displayValue": "200.200.100.1"
            },
            {
              "name": "Port(s)",
              "value": "500,600",
              "displayValue": "500,600"
            },
            {
              "name": "Temporary",
              "value": "true",
              "displayValue": "true"
            },
            {
              "name": "Expiration Date",
              "value": "2021-11-02",
              "displayValue": "2021-11-02"
            }
          ],
          [
            {
              "name": "Action",
              "value": "remove",
              "displayValue": "Remove Rule"
            },
            {
              "name": "Rule Type",
              "value": "inbound",
              "displayValue": "Inbound"
            },
            {
              "name": "AWS Account",
              "value": "R & D",
              "displayValue": "R & D"
            },
            {
              "name": "Security Group",
              "value": "sg-blahblahblah",
              "displayValue": "sg-blahblahblah"
            },
            {
              "name": "Protocol",
              "value": "tcp",
              "displayValue": "TCP"
            },
            {
              "name": "IP Address",
              "value": "200.100.100.3",
              "displayValue": "200.100.100.3"
            },
            {
              "name": "Port(s)",
              "value": "89",
              "displayValue": "89"
            },
            {
              "name": "Temporary",
              "value": "false",
              "displayValue": "false"
            },
            {
              "name": "Expiration Date",
              "value": "",
              "displayValue": ""
            }
          ]
        ]
      },
      {
        "name": "Firewall Rules",
        "rowCount": 2,
        "rowCollection": [
          [
            {
              "name": "Action",
              "value": "add",
              "displayValue": "Add Rule"
            },
            {
              "name": "Rule Type",
              "value": "permit",
              "displayValue": "Permit"
            },
            {
              "name": "Protocol",
              "value": "tcp",
              "displayValue": "TCP"
            },
            {
              "name": "Port(s)",
              "value": "100",
              "displayValue": "100"
            },
            {
              "name": "Source IP Address",
              "value": "100.100.100.1",
              "displayValue": "100.100.100.1"
            },
            {
              "name": "Destination IP Address",
              "value": "100.200.100.2",
              "displayValue": "100.200.100.2"
            },
            {
              "name": "Temporary",
              "value": "true",
              "displayValue": "true"
            },
            {
              "name": "Expiration Date",
              "value": "2021-11-03",
              "displayValue": "2021-11-03"
            }
          ],
          [
            {
              "name": "Action",
              "value": "add",
              "displayValue": "Add Rule"
            },
            {
              "name": "Rule Type",
              "value": "permit",
              "displayValue": "Permit"
            },
            {
              "name": "Protocol",
              "value": "tcp",
              "displayValue": "TCP"
            },
            {
              "name": "Port(s)",
              "value": "80, 443",
              "displayValue": "80, 443"
            },
            {
              "name": "Source IP Address",
              "value": "200.100.100.1",
              "displayValue": "200.100.100.1"
            },
            {
              "name": "Destination IP Address",
              "value": "200.200.100.2",
              "displayValue": "200.200.100.2"
            },
            {
              "name": "Temporary",
              "value": "false",
              "displayValue": "false"
            },
            {
              "name": "Expiration Date",
              "value": "",
              "displayValue": ""
            }
          ]
        ]
      }
    ]
  }
}
