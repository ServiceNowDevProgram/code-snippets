function onLoad() {
    var myMessage = '';

    myMessage += 'This is an expanding info message. It can even run code! Click "Show more" to see!';
    myMessage += '<div>';
    myMessage += '<p><a href="#" onclick="javascript: jQuery(this.parentNode).next().toggle(200);">Show more</a></p>';
    myMessage += '<div style="display: none;">';
    myMessage += '<ul style="list-style: none">';
    myMessage += '<li>This is the expanded info in the message.</li>';
    myMessage += '<li>You can include any details you like here, including info retrieved from a script like the sys_id of the current record: ' + g_form.getUniqueValue() + '</li>';
    myMessage += '</ul>';
    myMessage += '<p>You can even run a script when an element is clicked <a href="#" onclick="javascript: alert(\'See?\');">like this</a>. You just have to escape your code in the HTML.</p>';
    myMessage += '</div>';
    myMessage += '</div>';

    g_form.addInfoMessage(myMessage);
}
