This widget displays a paginated table of incident records using Next and Previous buttons to navigate between pages. The widget is built with AngularJS and integrates with ServiceNow GlideRecordSecure to fetch active and In progress incident records.

Features:

Displays Incident Records: The widget retrieves and displays active and In progress incident records from the ServiceNow incident table, including fields such as:
o Number
o State
o Short Description
o Priority
o Assignment Group
o Assigned To
Pagination:
o The table is paginated to show 5 records per page.
o Users can navigate through pages using Next and Previous buttons.
Files/Code Overview:

HTML Template (Table and Pagination UI):
• The HTML template uses an AngularJS directive ng-repeat to loop through displayData, which contains a subset of the incident records for the current page.
• A table is built with the following columns:
o Number, State, Short Description, Priority, Assignment Group, Assigned To.
• Pagination Controls:
o Previous Button: Decrements the currentPage and updates the table content.
o Next Button: Increments the currentPage and updates the table content.
• No Records: Displays a message when there are no records in displayData.

CSS Styles:
• .pageNum: Defines the styling for the page number display.
• .btngroupStyle: Minor adjustments to button margin.
• table: Ensures the table has a fixed layout and word wrapping to handle long text.
• .th: Defines the styling for the table header.

AngularJS Controller (api.controller):
• $scope.currentPage: Tracks the current page number.
• $scope.pageSize: Defines the number of records per page (set to 5).
• $scope.numberOfPages: Calculates the total number of pages based on the length of the tableRecord array.
• $scope.displayData: Contains the records to be displayed on the current page. It is updated whenever the user changes pages.
• Pagination Functions:
o pageChange(): This function updates the data shown when the user clicks the Next button. It calculates the range of records to display based on the current page index.
o previousPage(): This function updates the data shown when the user clicks the Previous button. It recalculates the range of records for the previous page.

Server-Side Script:
• Uses a GlideRecord query to retrieve incident records from the incident table where the state is "active" (state=2).
• The data fetched includes:
o Number, Short Description, Priority, State, Assignment Group, and Assigned To.
• Each record's sys_id is used to generate a clickable link for each incident in the table (sp?id=form&table=incident&sys_id=).
• The fetched data is stored in the data.tableRecord array.

How Pagination Works:
• Initial Page Load: When the widget is first loaded, it fetches all active incidents and displays the first 5 records.
• Next Button: When the user clicks the Next button, the page index is incremented by 1. The records from the next page are sliced from the tableRecord array and displayed in the table.
• Previous Button: When the user clicks the Previous button, the page index is decremented by 1. The records from the previous page are sliced and displayed.

Error Handling:
• If an error occurs during the GlideRecord query, an error message is captured and displayed using gs.addErrorMessage().

Customization:
• Change Page Size: Modify $scope.pageSize in the controller to change how many records are displayed per page.
• Alter Displayed Fields: Adjust the fields fetched from GlideRecord (like adding more fields or removing existing ones).
• Styling: Modify the CSS styles to customize the table layout, fonts, or button appearance.
