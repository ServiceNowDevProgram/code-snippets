# CustomDateUtils

A collection of scripts related sorting of an array of dates.

## sortArrayOfDateStrings();

The use of this function is to sort an array of date strings in Ascending order.

### Example

`new CustomDateUtils().sortArrayOfDateStrings(["2023-06-22", "2023-05-04", "2023-07-14", "2023-04-30", "2023-07-14"])`

## sortArrayOfDateStringsDesc();

The use of this function is to sort an array of date strings in Descending order.

### Example

`new CustomDateUtils().sortArrayOfDateStringsDesc(["2023-06-22", "2023-05-04", "2023-07-14", "2023-04-30", "2023-07-14"])`

## sortArrayOfDates();

The use of this function is to sort an array of GlideDate objects in Ascending order.

### Example

`var d1 = new GlideDate();`
`d1.setValue("2023-06-22");`
`var d2 = new GlideDate();`
`d2.setValue("2023-05-04");`
`var d3 = new GlideDate();`
`d3.setValue("2023-07-14");`
`var d4 = new GlideDate();`
`d4.setValue("2023-04-30");`
`var d5 = new GlideDate();`
`d5.setValue("2023-07-14");`

`new CustomDateUtils().sortArrayOfDates([d1, d2, d3, d4, d5])`

## sortArrayOfDatesDesc();

The use of this function is to sort an array of GlideDate objects in Descending order.

### Example

`var d1 = new GlideDate();`
`d1.setValue("2023-06-22");`
`var d2 = new GlideDate();`
`d2.setValue("2023-05-04");`
`var d3 = new GlideDate();`
`d3.setValue("2023-07-14");`
`var d4 = new GlideDate();`
`d4.setValue("2023-04-30");`
`var d5 = new GlideDate();`
`d5.setValue("2023-07-14");`

`new CustomDateUtils().sortArrayOfDatesDesc([d1, d2, d3, d4, d5])`
