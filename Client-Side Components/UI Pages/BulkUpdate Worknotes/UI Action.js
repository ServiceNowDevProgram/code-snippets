// Table: incident, List banner button: True, Client: True, Show update: True, OnClick: bulkupdate()

function bulkupdate() {
    var modalT = new GlideModal("BulkUpdate", false, 1200);
    modalT.setTitle("Bulk Update Worknotes");
    modalT.render();
}