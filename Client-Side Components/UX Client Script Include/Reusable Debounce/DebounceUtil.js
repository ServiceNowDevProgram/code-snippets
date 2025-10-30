function include() {
    class DebounceUtil {

        /**
         * @param callbackFunc - callback function following timeout
         * @param timeout - debounce timeout
         * @param helpers - the helpers object passed from a UX Client Script
         */
        static debounce(callbackFunc, timeout = 750, helpers) {
            let timer;
            return (...args) => {
                helpers.timing.clearTimeout(timer); // Clear anything currently in place
                timer = helpers.timing.setTimeout(() => { callbackFunc.apply(this, args); }, timeout);
            };
        }
    }
    return DebounceUtil;
}
