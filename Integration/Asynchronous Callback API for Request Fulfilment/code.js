Proposed Solution: 

1.	Synchronous Outbound Integration:
  >	 Utilize the REST integration step within the Flow Designer to send request details to the third-party endpoint.
  >  The third-party system is expected to send an acknowledgment upon receiving the request, confirming that it is being processed.
2.	Status Tracking:
    >	Introduce a new field or leverage an existing field in the sc_req_item table (or another relevant table) to track fulfilment status, with choice values such as "Success" or "Failure."
3.	Inbound Import Set API:
    >	Create an Inbound Import Set API that allows the third-party system to send updates back to ServiceNow. The fields in the import set table should include:
          Request Number: A unique identifier for the request.
	        Fulfilment Status: The status of the fulfilment (e.g., Success or Failure).
	        Work Notes: Additional comments or information regarding the fulfilment process.
4.	Transform Map:
    >	Establish a Transform Map where:
	      a. Source Table: The Import Set Table that receives the status updates.
        b. Target Table: The sc_req_item table (or another relevant table based on the use case).
	      c. Define field mappings to ensure accurate data transfer and use coalescing on the Request Number to allow updates only.
        d. Map the fulfilment status field from import set to new custom field to store the fulfilment status in sc_req_item table.
5.	Flow Changes:
	 >  Update the request stage based on the integration fulfilment status value
6.	API Sharing:
    >  Provide the Inbound Import Set API to the third-party system, enabling it to send fulfilment status updates once the fulfilment process is complete.
