In ServiceNow, Open catalog client Scripts [catalog_script_client] and paste the code snippet of [spModalSweetAlerts.js] file.

Setup:
1. A catalog item having variable name Rewards[rewards] of type 'Select Box'(include none as true) and 2 choices(Yes and No)
2. A Single line type field named 'Reward Selected' [reward_selected] which will hold the value selected by user from the spModal popup.
3. The onLoad catalog client script setup as below:
4. Type: onChange
5. Variable: rewards (as per step 1)
6. Script: [[spModalSweetAlerts.js]]
   


Screenshots:


<img width="1338" height="268" alt="image" src="https://github.com/user-attachments/assets/f7f22b83-7e0e-47bb-bbed-2a8f38783a4d" />


Rewards selected as 'Yes'

<img width="1353" height="327" alt="image" src="https://github.com/user-attachments/assets/1bb55339-36b4-4a9c-8b65-2b254b87cf5b" />

From the spModal popup select anyone of the reward, it should be populated in the Reward Selected field.
Along with that a message shows the same of the selection.

<img width="1350" height="319" alt="image" src="https://github.com/user-attachments/assets/1b23c766-51f8-4b01-9073-f836f390deb2" />

