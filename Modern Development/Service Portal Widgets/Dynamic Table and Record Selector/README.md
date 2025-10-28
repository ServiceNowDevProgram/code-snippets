Widget Name: Dynamic Table and Record Selector

Overview:
This ServiceNow Service Portal widget allows users to dynamically select any table and then choose a record from that table. The widget automatically determines which field should be shown as the display field for the selected table. It also handles parent table inheritance and provides fallback options for display fields.

Main Features:

Lists all tables from the sys_db_object table.

Automatically finds the correct display field (field with display=true).

Supports parent table lookup if the child table does not have a display field.

Provides fallback checks for fields named "name", "number", or defaults to "sys_id".

Uses ServiceNow REST APIs to fetch metadata and record data dynamically.

Works with the standard sn-record-picker directive in Service Portal.

How It Works:

The first record picker displays all tables from sys_db_object using the label field.

When the user selects a table, the widget fetches the actual table name and label using the sys_id.

The controller calls the getDisplayField function to determine which field should be displayed in the record picker.

It checks sys_dictionary for a field with display=true.

If found, that field is used as the display field.

If not found, it checks if the table has a parent (super_class).

If a parent exists, it recursively checks the parent table.

If there is no parent, it uses fallback checks for "name", then "number", and finally "sys_id".

The second record picker then displays the records from the selected table using the determined display field.

When the user selects a record, its sys_id is stored in the variable TableSysId.

Example Flow:

Select “Incident” from the table picker.

The widget detects that the display field is “number”.

The record picker lists incident numbers.

When a record is selected, its sys_id is saved for further use.

Technologies Used:

ServiceNow Service Portal

AngularJS (spUtil, spModal)

ServiceNow REST API:

/api/now/table/sys_db_object

/api/now/table/sys_dictionary

Use Cases:

Creating dynamic reference selectors for any table.

Building tools that link or map data between tables.

CMDB record selection where tables may have inheritance.

Generic admin utilities or catalog forms needing flexible input.

File Components:

HTML Template: Contains two sn-record-picker elements for selecting table and record.

Client Controller (JS): Handles field change events, fetches table metadata, determines display fields, and manages recursion logic.
