// Script Include: HmacUtils
// Purpose: Compute HMAC SHA-256 and constant-time compare.

var HmacUtils = Class.create();
HmacUtils.prototype = {
  initialize: function() {},

  hmacSha256Hex: function(secret, message) {
    var mac = Packages.javax.crypto.Mac.getInstance('HmacSHA256');
    var key = new Packages.javax.crypto.spec.SecretKeySpec(
      new Packages.java.lang.String(secret).getBytes('UTF-8'),
      'HmacSHA256'
    );
    mac.init(key);
    var raw = mac.doFinal(new Packages.java.lang.String(message).getBytes('UTF-8'));

    var sb = new Packages.java.lang.StringBuilder();
    for (var i = 0; i < raw.length; i++) {
      var hex = Packages.java.lang.Integer.toHexString((raw[i] & 0xff) | 0x100).substring(1);
      sb.append(hex);
    }
    return sb.toString();
  },

  constantTimeEquals: function(a, b) {
    var A = String(a || '');
    var B = String(b || '');
    if (A.length !== B.length) return false;
    var diff = 0;
    for (var i = 0; i < A.length; i++) diff |= A.charCodeAt(i) ^ B.charCodeAt(i);
    return diff === 0;
  },

  type: 'HmacUtils'
};
