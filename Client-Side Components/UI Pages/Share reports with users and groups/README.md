**Usecase:**
Currenlty there's no OOB feature to share the all the reports from the particular dashboard with the user or group at a time. Also, sharing the dashboard with the user/group doesnot share the corresponding reports with them automatically.
In order to do that, admin or report owner should open each report and share them individually.
If the dashboard has more reports i.e 20+, then it'll take a considerable amount of time to complete this task.
To reduce the manual effort, we can use this custom logic to share all the reports from the particular dashboard at a time.

**Pre-requisite:**
A database view which shows the reports shared with atleast one dashboard need to be created. 
ServiceNow community article link which explains how to build one..(Thanks to Adam Stout for this)
https://www.servicenow.com/community/performance-analytics-blog/view-reports-on-a-dashboard-and-dashboards-using-a-report/ba-p/2271548

**Components:**
1. UI Page: It contains Jelly script (HTML), Client script and Processing script. Used to capture the user/group info and share the rports with them.
2. UI Action(Client): Created on the Dashboards (pa_dashboards) table. Used to open the UI page as apopup/modal window

