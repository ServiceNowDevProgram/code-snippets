var HardwareValidationUtils = Class.create();
HardwareValidationUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    validateHardware: function() {
        var hardware = this.getParameter('sysparm_hardware');
        var qty = parseInt(this.getParameter('sysparm_quantity'), 10);

        if (!hardware || isNaN(qty)) {
            return 'Invalid input!';
        }

        var gr = new GlideRecord('u_hardware_inventory');
        if (gr.get(hardware)) {
            var availableQty = parseInt(gr.getValue('available_quantity'), 10);
            if (availableQty >= qty) {
                return 'OK';
            } else {
                return 'Not enough stock available!';
            }
        }
        return 'Hardware not found!';
    },

    type: 'HardwareValidationUtils'
});
