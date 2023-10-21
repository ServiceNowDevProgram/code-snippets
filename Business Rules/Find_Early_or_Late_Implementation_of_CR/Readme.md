The business rule will find the Change Request Implementation status. 
The requirement is to identify whether the CR is getting implementated before the planned start date or after the planned start date.
If the actuial start date is 15 minutes or more than 15 minutes prior to planned start date then the CR field "Early Implementation" is set to "Yes" otherwise "No"
To meet this requirement, create a field "Early Implementation" on change_request table with choices Yes (0), No (1), and a busienss rule that identifies when the change request state is moving to implement state.
This functionality helps to track whether the CRs are getting implementated in correct time or not. It comes very handy while reporting.
