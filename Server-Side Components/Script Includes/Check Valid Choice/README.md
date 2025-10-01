Introduction :

This script include is a client callable script include which can be used to check if the value of a choice field is valid, optionally given a dependent value. This is helpful when you do transforms and when you want to do some validations in your REST inbound messages.

Inputs and Outputs :
     * @param {object} current - GlideRecord object containing the current record
     * @param {string} The name of the choice field
     * @returns {bool}         - Boolean indicating whether the value of a choice field is valid

