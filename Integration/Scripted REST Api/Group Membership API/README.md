# Group Membership API- Scripted REST API
## Overview
This API provides a simple, secure way to reterive all members of a specified user group in ServiceNow. It allows integrations, Service Portal widgets, or external systems to query group membership without giving direct access to user tables

### API Details
- **API Name**: Group Membership API
- **API ID**: group_membership_api
- **ResourceName**: Members
- **Relative Path**: /members
- **HTTP Method**: GET
- **Query Parameter**: groupName (required)

## Request Format

### Example Request
GET https://<instance>.service-now.com/api/1819147/group_membership_api/members?groupName=Hardware

### Example Response
```json
{
   {
  "result": {
    "groupName": "Hardware",
    "totalMembers": 7,
    "member": [
      {
        "userName": "beth.anglin",
        "displayName": "Beth Anglin",
        "email": "beth.anglin@example.com",
        "active": "true"
      },
      {
        "userName": "itil",
        "displayName": "ITIL User",
        "email": "itil@example.com",
        "active": "true"
      },
      {
        "userName": "bow.ruggeri",
        "displayName": "Bow Ruggeri",
        "email": "bow.ruggeri@example.com",
        "active": "true"
      },
      {
        "userName": "david.dan",
        "displayName": "David Dan",
        "email": "david.dan@example.com",
        "active": "true"
      },
      {
        "userName": "david.loo",
        "displayName": "David Loo",
        "email": "david.loo@example.com",
        "active": "true"
      },
      {
        "userName": "don.goodliffe",
        "displayName": "Don Goodliffe",
        "email": "don.goodliffe@example.com",
        "active": "true"
      },
      {
        "userName": "fred.luddy",
        "displayName": "Fred Luddy",
        "email": "fred.luddy@example.com",
        "active": "true"
      }
    ]
  }
}

}
