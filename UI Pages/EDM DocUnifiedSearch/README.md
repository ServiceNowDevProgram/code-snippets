EDM ( Employee document management) which is part of HRSD product doesn’t allow query of employee documents based on different parameters e.g employee id, document type, employee and HR Case.
Current OOB implementation just allows users to query employee documents with list view filters.This results is slow performance and users get security constraints  error based on OOB ACLs which is not intuitive for most users.

Most of the organizations will have thousands of employee documents imported from different sources e.g Workday, Sharepoint and any type of sources.
During EDM implementation, most of the time we will have to import employee documents from these sources and OOB employee document table will contain thousands of documents.
Also, after cut off from these sources is done, ServiceNow EDM table becomes every growing table since all future employee documents will be stored in this table.

I created UI page which allows users to search employee documents based on employee, employee ID, document type and HR case.
This results is performance improvement as well as better UX for end users to search employee documents.

Note : Please make sure that you have com.sn_employee_document_management plugin active on your instance before using code for this UI page.
