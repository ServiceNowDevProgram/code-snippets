**Client Script**

Client script for verification if changed e-mail adders on user record is not already existing in sys_user table (real-time information about duplicated e-mail). Check is performed using asynchronous Ajax call and processed in callback function. In case e-mail already exists in sys_user table, message is displayed under email field with information which has have that e-mail.

**How to use**

You need to prepare both Script Include (which is processing check on backed) and Client Script (which is sending Ajax call after change on email field and display message).

Example Script Include configuration (code in [scriptInclude.js](scriptInclude.js)):
![Coniguration_SI](ScreenShot_2.PNG)

Example Client Script configuration (code in [clientScript.js](clientScript.js)):
![Coniguration_CS](ScreenShot_1.PNG)

**Example effect of execution**

![Coniguration_SI](ScreenShot_3.PNG)
