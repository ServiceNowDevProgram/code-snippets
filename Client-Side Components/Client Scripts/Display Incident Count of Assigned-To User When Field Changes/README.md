## Display Info-Message of Incident Count of Assigned-to User when field Assigned-To changes

Displays a message showing the count number of **incidents** for assigned-to member whenever the **Assigned To** field changes on the Incident form  
- Helps assess the assignee’s **current workload** by fetching and displaying active incident counts (excluding *Resolved*, *Closed*, and *Canceled* states).  
- Shows a **info message** with count of assignee's assigned incidents.
- Uses an onChange Client Script with GlideAjax to show an info message when the Assigned To field changes
  ---
  
