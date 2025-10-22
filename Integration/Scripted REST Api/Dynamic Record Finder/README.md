# Dynamic Record Finder - Scripted REST API
## Overview
The **Dynamic Record Finder** is a developer utility in ServiceNow that allows you to fetch records from any table  dynamically using query parameters based on:
- Table name
- Selected fields
- Filters (encoded query)
All returned data is in JSON format.


### API Details
- **API Name**: Dynamic Record Finder
- **API ID**: dynamic_record_finder
- **ResourceName**: find
- **Relative Path**: /find
- **HTTP Method**: GET
- **Query Parameter**: table,fields,query,limit

## Request Format

### Example Request
GET https:// instance.service-now.com/api/1819147/dynamic_record_finder/find?table=incident&fields=number%2Cshort_description&limit=20&query=category%3Dsoftware
### Example Response
```json
{
  "result": {
    "table": [
      "incident"
    ],
    "fields": [
      "number",
      "short_description"
    ],
    "status": [
      {
        "number": "INC0000012",
        "short_description": "Customer didn't receive eFax"
      },
      {
        "number": "INC0000034",
        "short_description": "Does not look like a backup occurred last night"
      },
      {
        "number": "INC0000038",
        "short_description": "my PDF docs are all locked from editing"
      },
      {
        "number": "INC0000006",
        "short_description": "Hangs when trying to print VISIO document"
      },
      {
        "number": "INC0009004",
        "short_description": "Defect tracking tool is down."
      },
      {
        "number": "INC0000015",
        "short_description": "I can't launch my VPN client since the last software update"
      },
      {
        "number": "INC0000019",
        "short_description": "Can't launch 64-bit Windows 7 virtual machine"
      },
      {
        "number": "INC0000027",
        "short_description": "Please remove the latest hotfix from my PC"
      },
      {
        "number": "INC0000046",
        "short_description": "Can't access SFA software"
      },
      {
        "number": "INC0000051",
        "short_description": "Manager can't access SAP Controlling application"
      },
      {
        "number": "INC0000052",
        "short_description": "SAP Financial Accounting application appears to be down"
      },
      {
        "number": "INC0000054",
        "short_description": "SAP Materials Management is slow or there is an outage"
      },
      {
        "number": "INC0009005",
        "short_description": "Email server is down."
      }
    ]
  }
}
