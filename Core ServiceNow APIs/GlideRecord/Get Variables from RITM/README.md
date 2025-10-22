# Get RITM Variables in JSON format

This method returns all the variables for a given RITM (along with MRVS if requested) as a JSON object.

For example;

```javascript
// Get a sample RITM
var requestItem = new GlideRecord("sc_req_item");
requestItem.get("797b7e8e4706b51001612c44846d4341")

var json = getVariablesJSON(requestItem, true);
gs.info(JSON.stringify(json, '', 3))
```
Returns JSON object similar to the following:

```json
{
   "virtual_machine": [
      {
         "vm_number": "1",
         "name": "Windows VM"
      },
      {
         "vm_number": "2",
         "name": "Linux VM"
      }
   ],
   "disks": [
      {
         "disk_vm_number": "1",
         "disk_size": "100Gb"
      },
      {
         "disk_vm_number": "2",
         "disk_size": "500Gb"
      },
      {
         "disk_vm_number": "2",
         "disk_size": "1Tb"
      }
   ],
   "requested_for": "ee826bf03710200044e0bfc8bcbe5dd4",
   "required_by": "2023-11-04"
}
```
