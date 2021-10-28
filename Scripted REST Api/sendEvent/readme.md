## Send Event Management events

Send test events to the event table in ServiceNow Event Management using the table API.

This script is useful for generating events to test configuration of Event and Alert rules in Event Management.

This script requires Powershell.

### Setup

Create a file `config.txt` that has the username, password and ServiceNow instance FQDN on separate lines. See `config.txt.sample` as an example.

Modify the file `event.json` with the details of the event that you want to send to the event table.

### Run it

Run the following command from the command line.

```
.\sendEvent.bat
```