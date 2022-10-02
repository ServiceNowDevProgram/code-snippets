A Function to get the next upcoming monday date

This function uses a few Glide date and Glide Date Time API's 

First we get todays date with GlideDateTime()

Then we get the day of the month number with GlideDate().getDayOfMonthNoTZ();

Then we use the make a calculation to set the day to the next monday

Finally, we calcualtate the day using AddDays we return the New Date transforming it back with getDate()


