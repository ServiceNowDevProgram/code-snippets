function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === oldValue) {
        return;
    }
    
    showProgressBar(control, newValue);
}

function showProgressBar(control, value) {
    var maxLength = 160; // Configurable maximum length
    var warningThreshold = 0.7; // Show yellow at 70% capacity
    var criticalThreshold = 0.9; // Show red at 90% capacity
    
    // Remove any existing progress bar
    var existingBar = gel(control.name + '_progress');
    if (existingBar) {
        existingBar.parentNode.removeChild(existingBar);
    }
    
    // Create progress bar container
    var container = document.createElement('div');
    container.id = control.name + '_progress';
    container.style.cssText = 'width: 100%; height: 4px; background: #e0e0e0; margin-top: 4px; border-radius: 2px; transition: all 0.3s ease;';
    
    // Create progress bar fill
    var fill = document.createElement('div');
    fill.style.cssText = 'height: 100%; width: 0%; border-radius: 2px; transition: all 0.3s ease;';
    
    // Calculate percentage
    var percent = (value.length / maxLength) * 100;
    percent = Math.min(percent, 100); // Cap at 100%
    
    // Set fill width and color
    fill.style.width = percent + '%';
    if (percent >= criticalThreshold * 100) {
        fill.style.backgroundColor = '#ff4444'; // Red
    } else if (percent >= warningThreshold * 100) {
        fill.style.backgroundColor = '#ffbb33'; // Yellow
    } else {
        fill.style.backgroundColor = '#00C851'; // Green
    }
    
    // Create percentage label
    var label = document.createElement('div');
    label.style.cssText = 'font-size: 11px; color: #666; margin-top: 2px; text-align: right;';
    label.textContent = Math.round(percent) + '% used';
    
    // Assemble and insert the progress bar
    container.appendChild(fill);
    container.appendChild(label);
    
    // Insert after the control
    var parent = control.getElement().parentNode;
    parent.insertBefore(container, control.getElement().nextSibling);
    
    // Add warning message if over limit
    if (value.length > maxLength) {
        g_form.addErrorMessage('This field exceeds the maximum length of ' + maxLength + ' characters');
    } else {
        g_form.clearMessages();
    }
}