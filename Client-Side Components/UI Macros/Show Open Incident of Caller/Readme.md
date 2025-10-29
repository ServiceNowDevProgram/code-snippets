Show Open Incident of caller

Script Type: UI Macro

Goal: In Form view caller can see what are the open incident of that particular caller.

Walk through of code: So for this use case a new macro will be added to the caller field,  when it is triggered it will open a new popup window where it will show the list of particular caller which are all open incident.So for this a new UImacro have been used in that a new list icon have been rendered from the db_image table and inside that a showopentckts() function this will get the current caller and then add the query to filter out the list of open incident and then open a popup to show the list of that particular caller which are all open(other than Closed and Cancelled).

Note: To inherite the UI Macro in that particular field (Caller) we need to add the attribute in the Dictionary Entry = ref_contributions=caller_inc_lists [ref_contributions="name of the macro"]

UI Macro
<img width="853" height="292" alt="UIMacro" src="https://github.com/user-attachments/assets/f5b353a2-ffb6-4e44-a740-9905b33cb484" />

Dictonary Entry in Attribute section
<img width="848" height="386" alt="UIMacroDictionary" src="https://github.com/user-attachments/assets/b21d2077-3df5-4408-9bb3-c0672fd1398b" />

UI Macro in Incident Form near the Caller Field
<img width="860" height="310" alt="From UIMacro" src="https://github.com/user-attachments/assets/c3867abf-f9cd-4947-a7e9-41c83189681d" />

Result:
<img width="865" height="409" alt="UIMacro Result" src="https://github.com/user-attachments/assets/5412b29b-e96b-4455-a3e0-5552c9680600" />
