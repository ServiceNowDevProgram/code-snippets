## Description
The planned lines of the ServiceNow burndown chart do not take holidays into account.  
By using this Python snippet, you can create a burndown chart with planned lines that take holidays into account.  
The generated burndown chart can also be automatically deployed as an image to Slack and other tools.  

## Requirements
OS: Windows/MacOS/Unix  
Python: Python3.x  
ServiceNow: More than Vancouver  
Plugins: Agile Development 2.0 (com.snc.sdlc.agile.2.0) is installed

## Installation
Clone the repository and place the "Burndown Chart" directory in any location.  
Execute the following command to create a virtual environment.  
<code>python3 -m venv .venv
macOS/Unix: source .venv/bin/activate
Windows: .venv\Scripts\activate
pip install -r requirements.txt
</code>

## Usage
1. Go to the Burndown Chart directory.
2. Prepare the following values ​​according to your environment:
- InstanceName: Your instance name (e.g. dev000000 for PDI)
- Credentials: Instance login information in Base64 (Read permission to the rm_sprint table is required.)
- Sprint Name: Target sprint name from the Sprint[rm_sprint] table

3. Run the command to install the required modules.  
<code>pip install -r equirements.txt</code>

5. Run sprint_burndown_chart.py.  
<code>python3 sprint_burndown_chart.py INSTANCE_NAME BASE64_ENCODED_STRING(USERID:PASSWORD) SPRINT_NAME</code>  
example:  
<code>python3 sprint_burndown_chart.py dev209156 YXBpOmpkc0RhajNAZDdKXnNmYQ== Sprint1</code>  

When you run it, a burndown chart image like the one shown will be created.
![figure](https://github.com/user-attachments/assets/50d3ffc2-4c66-4f4d-bb69-c2b98763621d)
