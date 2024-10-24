## Description
The planned lines of the ServiceNow burndown chart do not take holidays into account.  
By using this Python snippet, you can create a burndown chart with planned lines that take holidays into account.  
The generated burndown chart can also be automatically deployed as an image to Slack and other tools.  

## Requirements
Python3.x

## Installation
Clone the repository and place the "Burndown Chart" directory in any location.

## Usage
1. Go to the Burndown Chart directory.
2. Open script.py and enter the following variables according to your environment.
- BASIC: Instance login information (Read permission to the rm_sprint table is required.)
- SPRINT: Target sprint name from the Sprint[rm_sprint] table
  
  In addition, change the instance name <InstanceName> in the URL to your instance name.

3. Run the command to install the required modules.  
<code>pip install -r equirements.txt</code>

5. Run script.py.  
<code>python sprint_burndown_chart.py</code>

When you run it, a burndown chart image like the one shown will be created.
![figure](https://github.com/user-attachments/assets/50d3ffc2-4c66-4f4d-bb69-c2b98763621d)
