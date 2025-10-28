[HTML] 

<p></p>

[Server Script]

(function() {
data.browserVersion = gs.getSession().getProperty('user_agent_browser'); //Checks with the browser that user is using if applicable does the redirect to a different portal.
})();

[Client Controller]

function() {
  var c = this;
  if(c.data.browserVersion == 'ie')   //If the browsers is IE redirect to sp_classic.
	  {
		document.location = "/sp_classic";
	  }
   if(c.data.browserVersion == 'chrome') //If the browsers is IE redirect to sp_chrome.
	  {
		document.location = "/sp_chrome";
	  }
}
