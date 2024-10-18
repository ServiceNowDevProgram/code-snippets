When you use flow designer to calcualte the difference between two duration fields, these duration fields need to be changed into milliseconds using dateNumericValue(). To be able to convert the millisections back into a duration fields, this flow designer action used

- the milliseconds from the calculation as the input in an integer value
- the the code will add the milliseconds to the ServiceNow Epoch DateTime which the duration fields uses and then returns the time difference back into a string that can be added to a duration field
- the output of the action needs to be set to the time as a duration type field
