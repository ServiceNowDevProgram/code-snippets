// Auto-assign incident to groups based on category
(function execute(inputs, outputs) {
    var inc = new GlideRecord('incident');
    if (inc.get(inputs.incident_sys_id)) {
        switch(inc.category) {
            case 'Network':
                inc.assignment_group = 'Network Support';
                break;
            case 'Software':
                inc.assignment_group = 'Software Support';
                break;
            default:
                inc.assignment_group = 'Helpdesk';
        }
        inc.update();
    }
})(inputs, outputs);
