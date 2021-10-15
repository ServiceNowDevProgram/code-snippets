# Start, End, and Duration Updates
### Use this code to auto update associated GlideDateTime and Duration fields on a record.

This code assumes you're working on the sc_req_item and sc_task tables but can be modified to support other tables such as change.
1. Requires only a 2 of the 3 data points to work.  In this example, the start and duration variables are the required input.
2. Code checks for either a blank end time or if start or duration has changed. 
3. If start or duration has changed, it will calculate a new effective end date and duration accordingly.
4. If the end date is the one changing, it will calculate a new effective duration.
5. If all 3 data points change at the same time, only the start and duration fields will be accepted as input.  
6. It also includes a section to update an associated task if needed.
