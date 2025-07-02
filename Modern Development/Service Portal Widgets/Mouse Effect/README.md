# Cursor Light Ball Widget

This ServiceNow Service Portal widget creates a light blue, glowing "light ball" that follows the cursor with a smooth trailing effect. The light ball is offset slightly from the cursor and has a soft glow, giving a visually appealing effect on the page.

## Widget Components

### HTML
The widget contains a single `div` element representing the light ball.

### CSS
This contains the style for the `div` element in HTML

### Script
This function tracks the cursor's position and updates the light ball's position accordingly with a 10px offset. The mousemove event listener enables smooth, real-time cursor tracking.

## Installation
1. Add a new widget in ServiceNow and name it, for example, "Cursor Light Ball".
2. Copy the HTML, CSS, and JavaScript code provided into the respective sections of the widget.
3. Make sure you copy the JavaScript code in the Client Script section of the widget.
4. Save the widget, and add it to your Service Portal page to see the light ball effect.