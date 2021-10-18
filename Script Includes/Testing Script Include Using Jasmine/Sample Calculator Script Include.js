var VF_Calculator = Class.create();
VF_Calculator.prototype = {
    initialize: function () {
    },

    add: function (num1, num2) {
        this._validateNumbers(num1, num2);

        return num1 + num2;
    },

    divide: function (num1, num2) {

        if (num2 == 0) {
            throw new Error("Divide by zero is not permitted.");
        }

        this._validateNumbers(num1, num2);

        return num1 / num2;
    },

    _validateNumbers: function (num1, num2) {
        if (!num1 || !num2) {
            throw new Error("Both numbers should be valid.");
        }
    },

    type: 'VF_Calculator'
};