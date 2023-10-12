javascript: (c=> c.readText().then( text => window.open("http://" + window.location.hostname + "/nav_to.do?uri=task.do?sysparm_query=number=" + text, "_blank")))(navigator.clipboard);
