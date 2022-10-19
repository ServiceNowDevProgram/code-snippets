# Call Subflow from UI Action

This UI Action enables calling a subflow from ServiceNow Flow Designer using the FlowAPI.

### Instruction

The call can either be done synchronously or asynchronously, depending on the requirement. 
```javascript
//Synchronous Call: 
sn_fd.FlowAPI.getRunner().subflow('global.subflow_name').inForeground().withInputs(inputs).run();
//Asynchronous Call: 
sn_fd.FlowAPI.getRunner().subflow('global.subflow_name').inBackground().withInputs(inputs).run();
```

The API call requires the subflow internal name and scope. The internal name is shown as a second column in the subflow overview in ServiceNow Flow Designer, while the scope is shown in the third column. In the above example the subflow internal name is **subflow_name** and it was created in the **global** scope.

### Benefits
- Enable Citizen Developers to create complex UI Actions with low code Flow Designer capabilities instead of scripting
- Run complex server side UI Actions asynchronously via Flow Designer for better user experience (avoids long loading times in the current user session)
- Re-use already created subflows and actions as well as provided spokes in UI actions
