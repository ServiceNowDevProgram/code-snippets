// Class definition
var PasswordUtil = Class.create();
PasswordUtil.prototype = {
  initialize: function() {},

  /**
   * checkStrength
   * @param {String} pwd - The password string to evaluate
   * @return {String} result - Returns "Strong Password" or "Weak Password"
   */
  checkStrength: function(pwd) {
    // If password is empty/null, return message
    if (!pwd) return "Empty password!";

    // Rules for strong password:
    // 1. At least 8 characters
    // 2. At least one uppercase letter
    // 3. At least one lowercase letter
    // 4. At least one number
    // 5. At least one special character
    var strong = pwd.length >= 8 &&
                 /[A-Z]/.test(pwd) &&        // has uppercase
                 /[a-z]/.test(pwd) &&        // has lowercase
                 /[0-9]/.test(pwd) &&        // has number
                 /[^A-Za-z0-9]/.test(pwd);   // has special char

    return strong ? "Strong Password" : "Weak Password";
  },

  type: 'PasswordUtil'
};
