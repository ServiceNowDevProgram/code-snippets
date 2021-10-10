[HTML] 

<p></p>

[Server Script]

(function() {
data.browserVersion = gs.getSession().getProperty('user_agent_browser'); //Checks with the browser that user is using if applicable does the redirect to a different portal.
})();

[Client Controller]

function() {
  var c = this;
  if(c.data.browserVersion == 'ie')  
	  {
		document.location = "/sp_classic";
	  }
   if(c.data.browserVersion == 'chrome') 
	  {
		document.location = "/sp_chrome";
	  }
}
