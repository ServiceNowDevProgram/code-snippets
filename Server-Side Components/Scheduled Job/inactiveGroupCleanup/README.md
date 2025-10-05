This schedule script will execute monthly, weekly or bi-weekly as frequency is scheduled to identify all the groups that are not referenced in any Task(INC/PRD/CHG/RITM) past 6 months for analysis and inactivate them after analysis

What it does and how it can add value ?
 - Find out the groups that are inactive and not updated in last 6 months. Get the group names as a comma seprated array 
 - Check if the group has any task assigned in the last 6 months (tasks that were created after the date 6 months ago.)
 - Get the list as Output of all inactive group names as a comma-separated string

Benifits:
This activity has been carried out as cleanup activity for groups that are not in use and consuming license role 
