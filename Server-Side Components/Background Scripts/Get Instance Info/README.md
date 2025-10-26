A background script that retrieves and displays essential ServiceNow instance information including IP address, node ID, and instance name.

## Usage

1. Navigate to **System Definition → Scripts - Background**
2. Copy and paste the script content from `getInstanceInfo.js`
3. Click "Run script"
4. Check the system logs and info messages for the instance details

## What It Does

The script:
1. Retrieves the remote IP address of the current transaction using `GlideTransaction.get().getRemoteAddr()`
2. Gets the system/node ID using `GlideServlet.getSystemID()`
3. Fetches the instance name from system properties using `gs.getProperty("instance_name")`
4. Displays IP address and Node ID as info messages in the UI
5. Logs the instance name to the system logs


## Sample Output

**Info Messages:**
```
IP Address: 192.168.1.100
Node ID: node1abc123def456
```

**System Log:**
```
*** Script: mycompany-dev
```
