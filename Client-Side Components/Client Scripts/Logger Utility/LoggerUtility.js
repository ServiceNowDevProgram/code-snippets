//UI Script
(function() {
    'use strict';

    window.Logger = (function() {
        const isDebugEnabled = true; // change it to 'true' for production when needed

        function formatMessage(level, ...args) {
            const timestamp = new Date().toISOString();
            return [`[${timestamp}] [${level}]`, ...args];
        }

        return {
            info: (...args) => isDebugEnabled && console.info(...formatMessage('INFO', ...args)),
            debug: (...args) => isDebugEnabled && console.debug(...formatMessage('DEBUG', ...args)),
            warn:  (...args) => isDebugEnabled && console.warn(...formatMessage('WARN', ...args)),
            error: (...args) => console.error(...formatMessage('ERROR', ...args)) // always log errors
        };
    })();
})();


Client Side Usage:

 *   Logger.info('Form loaded successfully');
 *   Logger.debug('Field value:', g_form.getValue('short_description'));
 *   Logger.warn('Potential issue detected');
 *   Logger.error('An error occurred', errorObject);
