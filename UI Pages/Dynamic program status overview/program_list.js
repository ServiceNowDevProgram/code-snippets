showUsers();

function showUsers() {

    var tableHeaders = ['Status Date', 'Number', 'Name', 'Overall Health'];

    var gr = new GlideRecord("program_status");
    gr.orderByDesc('as_on');
    gr.query();

    if (gr.rows.length > 0) {

        var table = document.createElement("TABLE");
        table.setAttribute('class', "table table-hover row-clickable");
        table.border = "2";
        table.padding = "10px";
        table.id = "myTable";
        var columnCount = tableHeaders.length;
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = tableHeaders[i];
            row.appendChild(headerCell);
        }

        while (gr.next()) {
			
            if (gr.executive_summary.length > 20) {

                var pgmGR = new GlideRecord('pm_program');
                pgmGR.get(gr.program);

                row = table.insertRow(-1);

                var user = row.insertCell(0);
                var number = row.insertCell(1);
                var name = row.insertCell(2);
                var overall_health = row.insertCell(3);

                if (gr.as_on != '') {
                    user.innerHTML = gr.as_on;
                    number.innerHTML = gr.number;
                    name.innerHTML = pgmGR.short_description;
                    overall_health.innerHTML = gr.overall_health;
                } else {
                    user.innerHTML = '';
                }
                var dvTable = document.getElementById("dvTable");
                dvTable.innerHTML = "";
                dvTable.appendChild(table);
            }
            document.getElementById('no_users').style.display = 'none';
        }
    } else {
        document.getElementById('no_users').style.display = '';
        var Table = document.getElementById("dvTable");
        Table.innerHTML = "";
    }
}

document.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === "td") {
        var tr = e.target.closest('tr');
        var handler = new DashboardMessageHandler("program-status-filter");
        var filter_message = {};
        filter_message.id = "taskFilter";
        filter_message.table = "program_status";
        filter_message.filter = "number=" + e.target.innerHTML;

        SNC.canvas.interactiveFilters.setDefaultValue({
            id: filter_message.id,
            filters: [filter_message]
        }, false);

        handler.publishFilter(filter_message.table, filter_message.filter);

    } else {
        console.log('not a table cell', e.target.tagName);
    }
});
