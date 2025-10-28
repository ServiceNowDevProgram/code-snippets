>**Create a Client-Callable Script Include**

1. Develop a Script Include (assignedtochange) that extends AbstractAjaxProcessor.

2. The Script Include should accept a parameter (the user’s sys_id) passed from a Client Script.

3. It will query the Incident (incident) table to count how many records are assigned to that user.

4. Return the count to the client.

>**Create a Client Script**

1. From the Incident form, the Client Script will call the Script Include using GlideAjax.

2. Pass the Assigned to user’s sys_id as a parameter.

3. Display or use the returned Incident count on the client side (e.g., show a message or populate a field).

       Ex.
       function onChange(control, oldValue, newValue, isLoading, isTemplate) {
       if (isLoading || newValue === '') {
         return;
        }

       //Type appropriate comment here, and begin script below
         var aj = new GlideAjax('assignedtochange');
         aj.addParam('sysparm_name', 'assigned');
         aj.addParam('sysparm_assign', newValue);
         aj.getXMLAnswer(answer);

         function answer(response) {
        	alert ("Assigned to has already been an part of " + response + " Incidents");
           }
   
        }
