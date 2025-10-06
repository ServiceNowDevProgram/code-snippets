(function() {
  // Parse and set the steps array from widget options
  // If options.steps exists, parse the JSON string; otherwise, use empty array
  data.steps = options.steps ? JSON.parse(options.steps) : [];
  
  // Parse and set the current step index from widget options
  // If options.current_step exists, convert to integer; otherwise, default to 0
  data.currentStep = options.current_step ? parseInt(options.current_step) : 0;
})();
