CMDB API Documentation
Welcome to the CMDB API documentation. This document provides detailed information about the APIs created for CMDB.

Table of Contents
1. Create CIs
2. Create CI Relationship

1. Create CIs
  This API is designed to create Configuration Items (CIs).
  Request Details:
    Type: HTTP
    Method: POST
    URI: https://<service-now-domain>.service-now.com/api/cis/{ci_type}
    Headers:
     Accept: application/json
     Content-Type: application/json
  Request Body:
    The request body should contain a JSON key-value pair for the required fields.
  Response:
    Status Code: 200 OK
    Response Body: JSON with required fields

2. Create Ci Relationship
   Creates a Configuration Item (CI) relationship in ServiceNow
    Request Details:
    Type: HTTP
    Method: POST
    URI: https://<service-now-domain>.service-now.com/api/relationships
    Headers:
     Accept: application/json
     Content-Type: application/json
    Request Body:
      {
       "parent": "parentCiSysId",
       "type": "relationshipTypeSysId",
       "child": "childCiSysId"
      }
    Response:
      Status Code: 200 OK
      Response Body: JSON with required fields for CI Relationship
