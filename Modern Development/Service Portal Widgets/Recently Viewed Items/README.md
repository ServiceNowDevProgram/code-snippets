
# Recently Viewed Items

This is a modification to the out-of-the-box Homepage Search widget that displays the users 3 most recently viewed items under the search bar.

![image](https://github.com/captainbraddles/code-snippets/blob/554df81b4d4ca9e73efd1e4368842b1d87acb425/Service%20Portal%20Widgets/Recently%20Viewed%20Items/Recently%20viewed%20widget.png)

## Description

The modification to the out-of-the-box Homepage Search widget provides some additional text under the search bar the displays the logged in users 3 most recently viewed catalog items / record producers. It does not display
duplicate items.

The list of items is obtained from the sp_log table and can be modified to suit your needs for the number of records it checks to find the 3 most recent unique items. The default is 100.

## Getting Started

### Dependencies

* You must be in the scope of the widget you are modifying.

### Execution

1. Clone the out-of-the-box Homepage Search widget.
2. Add the HTML from the recently-viewed-items-widget.js file to your cloned widget under the <sp-widget widget="data.typeAheadSearch"></sp-widget> line.
3. Update the <PORTAL> components of the href tags with your portal suffix.
4. Add the CSS from the recently-viewed-items-widget.js file to your cloned widget CSS section.
5. Add the Server Script from the recently-viewed-items-widget.js file to your cloned widget Server Script section.
6. Save the widget and add it to your portal page.

### Custom Configurations
You can modify the CSS values to change the style of the text that is displayed under the search bar.

## Authors

Brad Warman

https://www.servicenow.com/community/user/viewprofilepage/user-id/80167

## Version History

* 0.1
    * Initial Release
