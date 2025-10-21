var CIValidationAjax = Class.create();
CIValidationAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  validateCi: function() {
    var ciSysId = this.getParameter('sysparm_ci');
    var result = { valid: false, display: '', message: '' };

    if (!ciSysId) {
      result.message = 'No CI provided.';
      return JSON.stringify(result);
    }

    var ci = new GlideRecord('cmdb_ci');
    if (!ci.get(ciSysId)) {
      result.message = 'CI not found.';
      return JSON.stringify(result);
    }

    result.display = ci.getDisplayValue();

    // Example rules: CI must be operational and have an assignment group
    var isOperational = String(ci.install_status) === '1'; // installed
    var hasGroup = !!ci.assignment_group;

    if (isOperational && hasGroup) {
      result.valid = true;
      return JSON.stringify(result);
    }

    var reasons = [];
    if (!isOperational) reasons.push('CI is not operational');
    if (!hasGroup) reasons.push('no assignment group is set');
    result.message = 'CI is not valid: ' + reasons.join('; ') + '.';
    return JSON.stringify(result);
  },

  isPublic: function() { return true; }
});
