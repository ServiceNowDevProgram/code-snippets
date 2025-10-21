// Business Rule: Quarantine risky attachments by type or size
// Table: sys_attachment | When: before insert

(function executeRule(current, previous /*null*/) {
  try {
    // Config
    var BLOCKED_EXTS = ['exe', 'bat', 'cmd', 'ps1', 'js'];
    var MAX_SIZE_MB = 25; // quarantine files larger than this
    var QUARANTINE_TABLE = 'incident'; // replace with your quarantine table if available
    var ASSIGNMENT_GROUP_SYSID = ''; // optional triage group

    // Skip non-file or missing metadata
    if (!current.table_name || !current.file_name) return;

    var utils = new QuarantineAttachmentUtils();
    var ext = utils.getExt(current.file_name);
    var sizeBytes = Number(current.size_bytes || 0);
    var isBlocked = BLOCKED_EXTS.indexOf(ext) !== -1;
    var isTooLarge = sizeBytes > (MAX_SIZE_MB * 1024 * 1024);

    if (!(isBlocked || isTooLarge)) return;

    var reason = isBlocked ? ('blocked extension .' + ext) : ('size ' + sizeBytes + ' bytes exceeds ' + MAX_SIZE_MB + ' MB');

    // Create quarantine record
    var quarantineId = utils.ensureQuarantineRecord(QUARANTINE_TABLE, current.file_name, reason, ASSIGNMENT_GROUP_SYSID);

    // Copy attachment to quarantine and delete original
    utils.copyAndDelete(current.table_name, current.table_sys_id, QUARANTINE_TABLE, quarantineId, current.sys_id);

    gs.info('[ATTACHMENT-QUARANTINE] file=' + current.file_name +
            ' ext=' + ext +
            ' size=' + sizeBytes +
            ' reason=' + reason +
            ' quarantined_to=' + QUARANTINE_TABLE + ':' + quarantineId);
  } catch (e) {
    gs.error('Attachment quarantine failed: ' + e.message);
  }
})(current, previous);
