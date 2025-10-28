# .Net Ticks to GlideDateTime

An utility function to convert .Net ticks to GlideDateTime.

A tick is 1/10000 of a milli second (1 Milli second = 10,000 ticks)

This is more useful when you are bringing the Date Time data from Microsoft tools such as Active Directory, which will provide date time values in ticks. By using this utility function we can convert it to ServiceNow native GlideDateTime object.

### Example

`var gdt = convertTicksToGlideDateTime(5954484981710000)`
