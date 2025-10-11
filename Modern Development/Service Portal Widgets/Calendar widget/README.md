# Calendar Widget for ServiceNow Portal
This widget creates a simple, interactive calendar for the ServiceNow portal, allowing users to navigate through months and view the current day highlighted. It displays the days of the month in a grid layout.

## Features
Monthly Navigation: Buttons for navigating between months.
Current Day Highlighting: The current date is highlighted in light blue.
Responsive Layout: The calendar adjusts to fit within the widget container.

## Usage

HTML Structure: The main HTML structure displays month navigation buttons and the days in a grid layout.

CSS Styling: CSS styles define the appearance of the calendar, including a shadowed border, day alignment.

JavaScript Controller:

Defines the calendar's navigation functionality.
Calculates and displays the days of the selected month.
Highlights today’s date if it is within the selected month.

## Code Structure
### Controller (api.controller):
Initializes the month and year to display the current month.
Provides functions to navigate to the previous and next month.
Calculates the days of the selected month and highlights the current date.
### CSS:
.calendar-widget: The main container for the calendar.
.calendar-header: Contains the month name and navigation buttons.

## Customization
### Highlight Colors:
Modify .current-day in the CSS to change the color for today’s date.
Month Names and Day Names:
Update the $scope.monthNames and $scope.dayNames arrays to localize or customize the labels.

### Example Usage
In the ServiceNow portal, add this widget to display an interactive calendar. This can be embedded in any dashboard or custom page where date visualization is needed.

## Known Issues
Initial Load: If dates do not display immediately, ensure the ng-init="loadCalendar()" directive is included in the main container.
Date Accuracy: The calendar currently starts with today's date. If dates appear incorrect, check the $scope.loadCalendar() function for accurate month and day calculations.