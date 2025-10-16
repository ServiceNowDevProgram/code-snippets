function onLoad() {
    var priority = g_form.getValue('priority');
    var control = g_form.getControl('priority');

    if (control) {
        switch (priority) {
            case '1': // Critical
                control.style.backgroundColor = '#ff4d4d';
                control.style.color = 'white';
                control.style.fontWeight = 'bold';
                break;
            case '2': // High
                control.style.backgroundColor = '#ffa500';
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '3': // Moderate
                control.style.backgroundColor = '#ffff66';
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '4': // Low
                control.style.backgroundColor = '#d3ffd3';
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '5': // Planning
                control.style.backgroundColor = '#e0e0e0';
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            default:
                control.style.backgroundColor = '';
                control.style.fontWeight = 'normal';
        }
    }
}
