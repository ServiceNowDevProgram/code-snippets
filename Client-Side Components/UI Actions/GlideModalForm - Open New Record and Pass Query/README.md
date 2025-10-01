This is an example of using the GlideModalForm API to open a brand new record on a specific table, passing along query parameters to it to assist with loading filling out the form

Within the UI Action settings it's recommended to ensure:
- Active is true
- Either show insert and/or show update is true
- Client is true
- Your appropriate List v2 or V3 compatible checkbox is true
- Onclick contains your function name that matches the function within your Script field -- the code related to this snipped would be: **functionName()**
- Set true to however you wish to display this UI Action to the user; whether that's via Form button, Form context menu, Form link, etc.
