/*
UI Action details:

Active: True
Name: Share reports
Table: Dashboard [pa_dashboards]
Order: 1000
Action name: share_report
Show update: True
Client: True
List v2 Compatible: True
Form button: True
Form style: Primary
Onclick: shareReport();

*/

function shareReport() {
    var modal = new GlideModal("sj_share_reports"); // UI Page id
    modal.setTitle("Share Reports");
    modal.setPreference('sysparm_key', g_form.getUniqueValue());
    modal.render();
}
