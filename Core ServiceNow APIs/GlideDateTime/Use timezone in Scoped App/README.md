The normal APIs for using Timezones modifications doesn't work in scoped app. For this you can use a undocumented API called "GlideScheduleDateTime". Meaning you can set the time to be e.g. 23 June 2023 15.00.00. And then you want that time to be in IST time, then you use this api to make set this and then you can save it in a normal glideDatetime and get the correct time saved in the field.

