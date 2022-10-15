# Call Subflow from UI Action

This UI Action enables calling a subflow from ServiceNow Flow Designer using the FlowAPI.


The call can either be done synchronously or asynchronously, depending on the requirement. 
```javascript
//Synchronous Call: 
sn_fd.FlowAPI.getRunner().subflow('global.subflow_name').inBackground().withInputs(inputs).run();
//Asynchronous Call: 
sn_fd.FlowAPI.getRunner().subflow('global.create_problem_from_incident').inForeground().withInputs(inputs).run();
```
