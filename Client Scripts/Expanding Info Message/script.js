function onLoad() {
    var message = '';

    message += 'This is an expanding info message. It can even run code! Click "Show more" to see!';
    message += '<div>';
    message += '<p><a href="#" onclick="javascript: jQuery(this.parentNode).next().toggle(200);">Show more</a></p>';
    message += '<div style="display: none;">';
    message += '<ul style="list-style: none">';
    message += '<li>This is the expanded info in the message.</li>';
    message += '<li>You can include any details you like here, including info retreived from a script like the sys_id of the current record: ' + g_form.getUniqueValue() + '</li>';
    message += '</ul>';
    message += '<p>You can even run a script when an element is clicked <a href="#" onclick="javascript: alert(\'See?\');">like this</a>. You just have to escape your code in the HTML.</p>';
    message += '</div>';
    message += '</div>';

    g_form.addInfoMessage(message);

}