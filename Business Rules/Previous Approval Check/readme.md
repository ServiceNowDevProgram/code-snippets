# Previous Approval Check
### Business rule to check for any approval requests by previous approvers and auto approve them.  If an approver had already approved a request, and is later asked to approve the same request again, usually in a different capacity, then the approval will be set as approved by the system automatically. 

Business rule settings:
- Table: sc_req_item
- Advanced: True (Checked)
- When: async
- Order: 1000
- Insert: False (Unchecked)
- Update: True (Checked)
- Delete: False
- Query: True
- Conditions: 
  - Approval is Requested
  - Approval history changes

![image](https://user-images.githubusercontent.com/25243029/136676161-0a842f97-0721-4f28-8b20-a83f52bed949.png)
