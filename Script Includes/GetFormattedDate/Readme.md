1. This script include converts string format date (Ex: 20230418) to GlideDate Object (2023-04-18)
2. A string date (Ex: 20230418) is passed as an input, which converts input string date to GlideDate object.
3. In ServiceNow, we cannot set String Formatted date values to Date type fields. To meet this requirement, first we convert the  string formatted date to ServiceNow supported format, then using GlideDate API we can utilize the formatted date on Date type fields.
