function()
{
	var c = this;
	
	var initializeWidget = function(demoMode)
	{
		console.log(c.data);

		if (demoMode)
		{
			setInterval(c.demoMode, 3000);
		}
		else
		{
			setTimeout(function(){ c.updateGraph(c.data.graph.value); }, 1000);
		}
	};
	
	this.demoMode = function()
	{
		var r = Math.floor(Math.random() * 100);
		c.updateGraph(r);
	};
	
	this.updateGraph = function(value)
	{
		var container = document.getElementById(c.data.graph.instanceId);
		container.style.setProperty("--DonutMetricValue", value);		
	};
	
	this.graphClick = function()
	{
		console.log("TEST");
		
		var input =
		{
			action : "TEST"
		};
		
		c.server.get(input).then(function(response)
		{
			c.data = response.data;
			
			if (c.data.graph)
			{
				console.log(c.data.graph);
				c.updateGraph(c.data.graph.value);
			}
		});
	};

	initializeWidget();
}
