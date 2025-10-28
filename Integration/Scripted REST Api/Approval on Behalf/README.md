# Approve On Behalf - Scripted REST API

## Overview
This REST API allows authorized users to approve or reject tasks on behalf of another user. The script handles impersonation, performs action on approval records, and returns appropriate responses based on the success or failure of the request.

### API Definition
- **Name**: Approve On Behalf
- **Application**: Global
- **Active**: Yes
- **HTTP Method**: POST
- **Relative Path**: /
- **Resource Path**: /api/aueis/approve_on_behalf

## Request Format
The API accepts `application/json` as the input format.

### Sample Request
```json
{
    "approvalRecId": "1234567890abcdef",
    "userId": "user.name",
    "action": "approve",
    "comments": "Approving on behalf of the user"
}


### Sample Success Response
json
Copy code
{
    "success": true,
    "message": "Action 'approve' performed successfully on approval record."
}
### Sample Error Response
json
Copy code
{
    "success": false,
    "message": "Invalid approval record ID: 1234567890abcdef"
}
