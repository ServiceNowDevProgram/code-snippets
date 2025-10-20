function onLoad() {
    var fieldName = 'short_description'; // Change to your field name
    var maxLength = 160;
    var warningThreshold = 0.7;
    var criticalThreshold = 0.9;

    var fieldElement = g_form.getControl(fieldName);
    if (!fieldElement) return;

    // Add progress bar initially
    addProgressBar(fieldElement, fieldElement.value);

    // Attach keyup event for real-time updates
    fieldElement.addEventListener('keyup', function() {
        addProgressBar(fieldElement, fieldElement.value);
    });
}

function addProgressBar(fieldElement, value) {
    var maxLength = 160;
    var warningThreshold = 0.7;
    var criticalThreshold = 0.9;

    // Remove any existing progress bar
    var existingBar = document.getElementById(fieldElement.name + '_progress');
    if (existingBar) {
        existingBar.parentNode.removeChild(existingBar);
    }

    // Create progress bar container
    var container = document.createElement('div');
    container.id = fieldElement.name + '_progress';
    container.style.cssText = 'width: 100%; height: 4px; background: #e0e0e0; margin-top: 4px; border-radius: 2px; transition: all 0.3s ease;';

    // Create progress bar fill
    var fill = document.createElement('div');
    fill.style.cssText = 'height: 100%; width: 0%; border-radius: 2px; transition: all 0.3s ease;';

    // Calculate percentage
    var percent = (value.length / maxLength) * 100;
    percent = Math.min(percent, 100);

    // Set fill width and color
    fill.style.width = percent + '%';
    if (percent >= criticalThreshold * 100) {
        fill.style.backgroundColor = '#ff4444';
    } else if (percent >= warningThreshold * 100) {
        fill.style.backgroundColor = '#ffbb33';
    } else {
        fill.style.backgroundColor = '#00C851';
    }

    // Create percentage label
    var label = document.createElement('div');
    label.style.cssText = 'font-size: 11px; color: #666; margin-top: 2px; text-align: right;';
    label.textContent = Math.round(percent) + '% used';

    // Assemble and insert the progress bar
    container.appendChild(fill);
    container.appendChild(label);

    // Insert after the field element
    var parent = fieldElement.parentNode;
    parent.insertBefore(container, fieldElement.nextSibling);

    // Add warning message if over limit
    if (value.length > maxLength) {
        g_form.addErrorMessage('This field exceeds the maximum length of ' + maxLength + ' characters');
    } else {
        g_form.clearMessages();
    }
}