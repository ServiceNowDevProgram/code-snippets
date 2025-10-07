**Use Case:**

When using generic request flows for catalog items, the catalog items have different delivery time. However, flow stages are not flexible enough to dynamically set the due dates based on catalog item's delivery time. This limitation can lead to inaccurate due dates, affecting SLAs and user expectations.

**Proposed Solution:**

To address this, create two business rules to set due dates of RITM and Request:
1. Requested Item (RITM) Due Date:
   - Implement a Before Business Rule on the "sc_req_item" table.
   - This rule will calculate the due date by adding the delivery time (in days) from the associated catalog item record to the current date.
   - The calculated due date will then be set on the RITM.

2. Request Due Date:
   - Implement a Before Business Rule on the "sc_request" table.
   - It will then determine the maximum (farthest) due date among all RITMs associated with the request and set it as the due date for the request.
   - Since RITMs are created before the request record, this logic ensures accurate aggregation of due dates.

**Benefits:**
- Ensures accurate due dates for both RITMs and Requests.
- Improves SLA tracking and reporting.
- Enhances user satisfaction by aligning expectations with actual delivery timelines.
- Reduces manual intervention and customization in flows.
