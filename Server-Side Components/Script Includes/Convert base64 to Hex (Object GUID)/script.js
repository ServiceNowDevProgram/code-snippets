var LDAP_AD_Utils = Class.create();
LDAP_AD_Utils.prototype = {
    initialize: function() {},
	
    base64ToHex: function(str) {

        var decoded = GlideStringUtil.base64DecodeAsBytes(str);

        var n = decoded.length;

        if (n < 16) {

            return '';

        }

        var retVal = '';

        retVal = retVal + this.prefixZeros(decoded[3] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[2] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[1] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[0] & 0xFF).toUpperCase();

        retVal = retVal + '-';

        retVal = retVal + this.prefixZeros(decoded[5] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[4] & 0xFF).toUpperCase();

        retVal = retVal + '-';

        retVal = retVal + this.prefixZeros(decoded[7] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[6] & 0xFF).toUpperCase();

        retVal = retVal + '-';

        retVal = retVal + this.prefixZeros(decoded[8] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[9] & 0xFF).toUpperCase();

        retVal = retVal + '-';

        retVal = retVal + this.prefixZeros(decoded[10] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[11] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[12] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[13] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[14] & 0xFF).toUpperCase();

        retVal = retVal + this.prefixZeros(decoded[15] & 0xFF).toUpperCase();

        return retVal.toLowerCase();

    },


    prefixZeros: function(value) {

        if (value <= 0xF) {

            return '0' + value.toString(16);

        } else {

            return value.toString(16);

        }

    },

    type: 'LDAP_AD_Utils'
};
