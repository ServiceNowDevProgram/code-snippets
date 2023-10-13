# Update All Store Apps

## Introduction
This script is here to be ran as a background script, but could also be utilized as a Script Include. 

The usage here will only be referenced as background script. 

# Step 1: Get ready to run the script

***Go to System Definition > Scripts - Background***

At the bottom of the page, switch your scope to **Global**.

![](2023-10-13-08-42-48.png)

# Step 2: Copy and paste the script

Copy the entire script and paste into the background script window.

# Step 3: Run the script

Scroll to the bottom of the background script window. 

Select one of the options below to run.

## OPTION 1: Find how out many apps are available to upgrade

1. ***Paste this line at the bottom of the script.***

    ```javascript
    new upgradeUtil().countUpgrades();
    ```

    ![](2023-10-13-08-47-01.png)

2. ***Click the "Run script" button.***

    ### 
    ![](2023-10-13-08-55-37.png)

    *All apps that can be upgraded are displayed along with their version number.*

    *In the example below ...*

    * *679 apps total are installed*

    * *The app **@devsnc/sn-help-setup** can be upgraded to the version **23.0.2**.*

3. ***Scroll to the bottom of the page to see the total number of apps to be upgraded.***

    ![](2023-10-13-09-02-32.png)


## OPTION 2: Upgrade all apps by hard-coding a username and password

<table>
  <tr>
    <td><b>Difficulty:</b></td>
    <td>Easy</td>
  </tr>
  <tr>
    <td><b>Security:</b></td>
    <td>Low</td>
  </tr>
</table>

:warning: **Warning**: 

<table class="warning">
   <tr>
   <th>⚠️ Warning</th>
   </tr>
   <tr>
   <td>
    <p>Using <strong>Option 2</strong> will expose the credentials in the System Log on your instance. Do not use this method if you do not want to expose these in the System Log. Any user with the *admin* role will be able to view these credentials in the log.</p>
    <strong>YOU HAVE BEEN WARNED.</strong>
   </td>
   </tr>
</table>

1. ***Paste this line at the bottom of the script.***

    ```javascript
    upgradeUtil.upgradeAllAvailable('admin', 'password');
    ```

    Update **password** to the password of the user **admin**.

    You may also use a different user instead of **admin** but the user must have the *admin* role. 


2. ***Click the "Run script" button.***


## OPTION 3: Upgrade all apps using a Connection Alias 

<table>
  <tr>
    <td><b>Difficulty:</b></td>
    <td>Medium</td>
  </tr>
  <tr>
    <td><b>Security:</b></td>
    <td>High</td>
  </tr>
</table>

### OPTION 3: SECTION A

<table class="info">
   <tr>
   <th>ⓘ Info</th>
   </tr>
   <tr>
   <td>
    <p>You only need to complete SECTION A the first time you use the script on your instance.</p>
    <p>After that, the Credential is configured and does not need to be defined again so you can skip straight to [SECTION B](#option-3-section-b) for any other time you run the script after the first time.</p>
   </td>
   </tr>
</table>



1. ***Change your Application Scope to "Continuous Integration and Continuous Delivery (CICD) Spoke"***

    ![](2023-10-13-10-19-54.png)

1. ***Go to All >> Connections & Credentials >> Connection & Credential Aliases***

    ![](2023-10-13-10-22-40.png)

1. ***Open the record where Name is "CICD".***

1. ***Change the "Type" to "Connection & Credential".***

    ![](2023-10-13-10-25-04.png)

1. ***Click the context menu hamburger button and Save the record.***

    ![](2023-10-13-10-27-05.png)

1. ***Click the **New** button in the Credentials related list.***

    ![](2023-10-13-10-26-37.png)

1. ***Select Basic Auth Credentials.***

    ![](2023-10-13-09-49-57.png)

1. ***Complete the form with the following values, then click Submit.***

    | Field | Value | Description |
    |--|--|--|
    | **Name**| admin@myInstanceName | This field is a *description* of the HTTP Connection. A good syntax to use is the name of the account '@' the name of the instance.  
    | **Connection URL** | `http://example.service-now.com` | The URL of your ServiceNow instance. Please do not put the value literally as `http://example.service-now.com`.

1. ***Click the context menu hamburger button and Save the record.***

1. ***Click the reference field icon next to the field Credential.***

    ![](2023-10-13-10-31-04.png)

1. ***Click New.***

    ![](2023-10-13-10-31-29.png)

1. ***Select 'Basic Auth Credentials'.***

1. ***Complete the form with the following values, then click Submit.***

    | Field | Value | Description |
    |--|--|--|
    | **Name**| admin@myInstanceName | This field is a *description* of the credential. A good syntax to use is the name of the account '@' the name of the instance.  
    | **User name** | `admin` | This is the User that the script will log in to the instance with. 
    | **Password** | `password` | This is the password for the User specified above. After you save the record, the dots in the field will be shorter than the actual password. This is normal to prevent users from knowing the actual length of the password.

1. ***Click the context menu hamburger button and Save the record.***

    ![](2023-10-13-10-33-17.png)

### OPTION 3: SECTION B

1. ***Go to System Definition > Scripts - Background***

1. ***Paste this line at the bottom of the script.***

    ```javascript
    upgradeUtil.upgradeAllAvailable('alias','752a91887740001038e286a2681061fb');
    ```

   *In this scenario, the script will use a Connection Alias with the sys_id `752a91887740001038e286a2681061fb`.*

1. ***Click the "Run script" button.***


# More information 

**Product Docs: Install multiple applications in a batch** [https://docs.servicenow.com/csh?topicname=cicd-spoke-batch-install.html&version=latest](https://docs.servicenow.com/csh?topicname=cicd-spoke-batch-install.html&version=latest)

**Product Docs: Create a Connection & Credential alias:** [https://docs.servicenow.com/csh?topicname=connection-alias.html&version=latest](https://docs.servicenow.com/csh?topicname=connection-alias.html&version=latest)

**Product Docs: Continuous Integration/Continuous Delivery (CICD) API:** [https://docs.servicenow.com/csh?topicname=cicd-api.html&version=latest](https://docs.servicenow.com/csh?topicname=cicd-api.html&version=latest)


<style>
        table.warning {
            background-color: #FFFF99; /* Yellow background for all cells */
            border-collapse: collapse;
        }

        table.warning th {
            background-color: #FFD700; /* Darker yellow for the header row */
            text-align: left;
            font-weight: bold;
            border: none; /* Remove borders for header cells */
            padding: 10px;
        }

        table.warning td {
            background-color: #FFFF99; /* Yellow background for data cells */
            text-align: left;
            border: none; /* Remove borders for data cells */
            padding: 10px;
        }

        table.info {
            background-color: #4CB3D4; /* blue background for all cells */
            border-collapse: collapse;
        }

        table.info th {
            background-color: #4CB3D4; /* Darker blue for the header row */
            text-align: left;
            font-weight: bold;
            border: none; /* Remove borders for header cells */
            padding: 10px;
        }

        table.info td {
            background-color: #EEF9FD; /* blue background for data cells */
            text-align: left;
            border: none; /* Remove borders for data cells */
            padding: 10px;
        }
</style>