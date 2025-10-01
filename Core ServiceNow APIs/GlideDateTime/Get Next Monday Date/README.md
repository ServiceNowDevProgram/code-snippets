
# A Date Function to get the next upcoming Monday date.

This function uses a few Glide date and Glide Date Time API's 

1. First we get todays date with GlideDateTime()

2. Then we get the day of the month number with GlideDate().getDayOfMonthNoTZ();

3. Then we use the make a calculation to set the day to the next monday

4. Finally, we calcualtate the day using AddDays we return the New Date transforming it back with getDate()


