**Fix script**

Fix Script for cleaning update set from customer updates made by a selected developer. Script can be adjusted to match different query for cleaning which fits your needs.

Cleaning customer updates from update set is not removing updates made in system on direct records! It is just removing customer updates from update set to not move it to forward environments. 

*******
Enhancement - 8th october 2025
This scrip is an enhancement to existing script and will look for the default update set(same application) and move the customer update to default update set.
Deletion is not recommended way so moving to default is a better option.
*******
**Example configuration of Fix Script**

![Coniguration](ScreenShot_3.PNG)

**Example execution logs**

![Logs](ScreenShot_4.PNG)

**Example effect of execution**

Before execution:
![Before](ScreenShot_1.PNG)

After execution:
![After](ScreenShot_2.PNG)
