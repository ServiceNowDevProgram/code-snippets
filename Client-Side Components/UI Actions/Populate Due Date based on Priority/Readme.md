Calculate the due date based on the Priority

Script Type: UI Action, Table: incident, Form button: True, Show update: True, Condition: (current.due_date == '' && current.priority != '5'), OnClick: functionName()

Script Type: Script Include, Glide AJAX enabled: False

Schedule- Name: Holidays, Time Zone: GMT

Schedule Entry - Name:  New Year's Day, Type: Exclude, Show as: Busy, When: 31-12-2024, To: 01-01-2025
Schedule Entry - Name:  Christmas Day, Type: Exclude, Show as: Busy, When: 24-12-2025, To: 25-12-2025
Schedule Entry - Name:  Thanksgiving Day, Type: Exclude, Show as: Busy, When: 26-11-2025, To: 27-11-2025
Schedule Entry - Name:  Diwali, Type: Exclude, Show as: Busy, When: 19-10-2025, To: 20-10-2025

Goal: To Calculate Due-Date based on Priority with some conditions.

Walk through of code: So in this use case the UI Action is been used and then Script Include for server calculate is used.So the main to calculate the due-date by the user trigger.

UI Action- So this button will check the priority and check the due date field is empty or not if not then will fetch the value of "Priority" and "Created date" and pass the data to the Script Include for calculation once it gets the response will populate the value to the due_date field in the incident table and then update it.

Script Include- The role of this is to get the "Priority" and "Created date" based on prioriy this will calculate the time and date by using th GlidDateTime API and the will do some additional changes based on each priorit which is mentioned below and then return the response back to the UI Action,

Schedule & Schedule Entry- It is used for the P3 and P4 Priority which is mentioned below for the use case.To exclude the Holidays.

These are the use case which the above functionality works,

1-> P1 - add 4hrs to the Created date
2-> P2 - add 4hrs to the Created date but if it's exceed the working hrs of of 5 PM the add to the next day or if the is before the working hours of 8 AM set 5 PM to the same Created date.
3-> P3 or P4 - Kind of low priority so add the due date to the next day but it should exclude the holidays and the weekend's and the populate the next business working day.
4-> P5 - User manually will populate the due date based on the process.

The UI Action on the Incident Form
<img width="815" height="382" alt="Button" src="https://github.com/user-attachments/assets/68876b10-e6e0-43b9-9ecf-f6eb95b7ef87" />

UI Action which will call the Script Include
<img width="556" height="425" alt="UI Action" src="https://github.com/user-attachments/assets/2715232a-000b-4520-8b1a-f5bf72afdaa9" />

Script Include
<img width="817" height="416" alt="SI" src="https://github.com/user-attachments/assets/5ddb332c-d23f-4746-b014-1a71acb59186" />

Schedules and Schedule Entry
<img width="839" height="431" alt="Schedules" src="https://github.com/user-attachments/assets/f96ea4dc-e2d4-4d8f-87b7-67df66a2d8af" />
<img width="917" height="370" alt="Schedule Entry" src="https://github.com/user-attachments/assets/c4fec5ce-8ee4-46cc-8673-2d22a27290f1" />

Output
<img width="828" height="356" alt="Priority 1" src="https://github.com/user-attachments/assets/7f4049b6-294e-4064-bab1-e2d1ab938bfd" />
<img width="817" height="416" alt="Priority 2" src="https://github.com/user-attachments/assets/37f0cffd-f05c-4f4d-bf35-36090f02ee3b" />
<img width="815" height="334" alt="Priority 4" src="https://github.com/user-attachments/assets/0ab4ab27-4726-4ea7-b99e-7e35f9b0f4c7" />
