**This can be used in Yokohama++ instances**

As part of Yokohama release the problem of logging and calculating time taken by a piece of script has been addressesed by bringing standardized timing tools to the platform, enabling precise performance analysis with minimal effort and developers can isolate slow operations.

Use Case: Query overall incident record and bulk update with specific values. Need time taken for query and update.


​console.time(label)
   Starts a timer with a unique label. Use this at the beginning of a code block you want to measure.  
 
​console.timeLog(label, [data])
   Logs the current duration of the timer without stopping it. Optional data can be appended for context.  
 
​console.timeEnd(label)
   Stops the timer and logs the total execution time. 

ServiceNow Documentation: https://www.servicenow.com/docs/bundle/yokohama-api-reference/page/app-store/dev_portal/API_reference/Console/concept/ConsoleAPI.html
