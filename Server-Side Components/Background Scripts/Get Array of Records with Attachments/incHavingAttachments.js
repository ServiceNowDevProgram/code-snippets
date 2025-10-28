//GlideRecord the [incident] table and fetching all the active incident records having attachments

var incWithAttachment = [];
var checkAttachments = new GlideRecord('incident');
checkAttachments.addActiveQuery();
checkAttachments.query();
while (checkAttachments.next()) {
    if (checkAttachments.hasAttachments()) {
        incWithAttachment.push(checkAttachments.number.toString());
    }
}
gs.info("Incident Records having attachment: " + incWithAttachment);
