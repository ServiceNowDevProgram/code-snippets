In scenarios where it's necessary to verify Read/Write access for multiple users across various work items (such as Incidents, Tasks, etc.), traditional methods like impersonating individual users or using the Access Analyzer plugin can be time-consuming. This utility streamlines the process by enabling simultaneous access analysis for multiple users by impersonating them and can be executed efficiently via a background script.

userId- Array containing the user id of personas whose access to be analyzed.

workItems- Work items extending the 'task' table.
