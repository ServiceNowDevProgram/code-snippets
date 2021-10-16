(function(){
	
  // Get maximum count
	
  var maximumItems = new GlideAggregate(options.data_table);

  maximumItems.addEncodedQuery(options.maximum_count_query);
  maximumItems.addAggregate('COUNT');
  maximumItems.query();

  var maximumCount = 100;

  if (maximumItems.next())
  {
    maximumCount = maximumItems.getAggregate("COUNT");
  }
	
  // Get current count
	
  var currentItems = new GlideAggregate(options.data_table);

  currentItems.addEncodedQuery(options.current_count_query);
  currentItems.addAggregate('COUNT');
  currentItems.query();

  var currentCount = 0;

  if (currentItems.next())
  {
    currentCount = currentItems.getAggregate("COUNT");
  }

  // Calculate percentage value
	
  var percentage = Math.ceil(currentCount / maximumCount * 100);
	
  data.graph = {};
  data.graph.value = percentage;
  data.graph.instanceId = options.unique_instance_id;
  data.graph.initialValue = options.initial_value;
  data.graph.captionText = options.caption_text;	
  data.graph.infoText = options.info_text;
  data.graph.style = {};
  data.graph.style.outerShadow = options.outer_shadow;
  data.graph.style.innerShadow = options.inner_shadow;
  data.graph.style.ringColor = options.ring_color;
  data.graph.style.infoTextColor = options.info_text_color;
	
  data.debug = { options : options };
	
  if (input)
  {
    if (input.action === "TEST")
    {
      data.graph.value = Math.floor(Math.random() * 100);
    }
  }
	
})();
