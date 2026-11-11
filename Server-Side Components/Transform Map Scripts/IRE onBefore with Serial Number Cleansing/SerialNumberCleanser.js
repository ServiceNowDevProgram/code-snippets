/**
 * Script Include: SerialNumberCleanser (server side, not client callable)
 *
 * Cleanses a serial number before it is used for CI identification:
 * - returns '' for placeholders such as "To be filled by O.E.M." or "Default string",
 *   using the same check as Discovery (SerialNumberManager, rules in dscy_invalid_serial)
 * - otherwise removes whitespace and converts to upper case ("pf3 abc12 " -> "PF3ABC12")
 * - keeps VMware serials as they are apart from trimming, because Discovery stores them with spaces
 *
 * Usage:
 *   var serial = new SerialNumberCleanser().cleanse(source.getValue('u_serial_number'));
 *   if (serial) { values.serial_number = serial; }
 */
var SerialNumberCleanser = Class.create();
SerialNumberCleanser.prototype = {

    // only used if SerialNumberManager is not available; compared without whitespace, upper case
    FALLBACK_PLACEHOLDERS: [
        'TOBEFILLEDBYO.E.M.', 'DEFAULTSTRING', 'SYSTEMSERIALNUMBER', 'CHASSISSERIALNUMBER',
        'NOTSPECIFIED', 'NONE', 'N/A', 'UNKNOWN', '0123456789', '123456789'
    ],

    initialize: function () {
        this.manager = typeof SerialNumberManager != 'undefined' ? new SerialNumberManager() : null;
    },

    /**
     * @param {string} raw serial number as delivered by the source
     * @returns {string} cleansed serial number, or '' if it is empty or a placeholder
     */
    cleanse: function (raw) {
        var serial = String(raw === null || raw === undefined ? '' : raw).trim();
        if (!serial || this.isPlaceholder(serial)) {
            return '';
        }
        if (/^vmware-/i.test(serial)) {
            return serial;
        }
        return serial.replace(/\s+/g, '').toUpperCase();
    },

    /**
     * @param {string} serial
     * @returns {boolean} true if the value is not a real serial number
     */
    isPlaceholder: function (serial) {
        if (this.manager) {
            return !this.manager.isValid(serial);
        }
        var key = String(serial).replace(/\s+/g, '').toUpperCase();
        return this.FALLBACK_PLACEHOLDERS.indexOf(key) >= 0 || /^(.)\1*$/.test(key);
    },

    type: 'SerialNumberCleanser'
};
