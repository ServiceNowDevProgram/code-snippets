function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    
    var FIELD_NAME = 'short_description';
    var MAX_CHARS = 100;
    var currentLength = newValue.length;
    var counterId = FIELD_NAME + '_counter_label';
    if (typeof g_form.getControl(FIELD_NAME) !== 'undefined' && !document.getElementById(counterId)) {
        var controlElement = g_form.getControl(FIELD_NAME);
        var counterLabel = document.createElement('div');
        counterLabel.setAttribute('id', counterId);
        counterLabel.style.fontSize = '85%';
        counterLabel.style.marginTop = '2px';
        controlElement.parentNode.insertBefore(counterLabel, controlElement.nextSibling);
    }
    var counterElement = document.getElementById(counterId);

    if (counterElement) {
        var remaining = MAX_CHARS - currentLength;
        
      
        counterElement.innerHTML = 'Characters remaining: ' + remaining + ' (Max: ' + MAX_CHARS + ')';

        // Apply red color if the limit is exceeded
        if (remaining < 0) {
            counterElement.style.color = 'red';
        } else {
            // Revert color if back within limits
            counterElement.style.color = 'inherit';
        }
    }
}
