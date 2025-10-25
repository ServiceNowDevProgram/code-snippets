// Basic debounce - delays function execution until after user stops action
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Debounce with cancel method
function debounceWithCancel(func, wait) {
    let timeout;
    const debounced = function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
}

// Debounce with flush - execute immediately
function debounceWithFlush(func, wait) {
    let timeout, lastArgs, lastThis;
    const debounced = function(...args) {
        lastArgs = args;
        lastThis = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(lastThis, lastArgs), wait);
    };
    debounced.flush = () => {
        if (timeout) {
            clearTimeout(timeout);
            func.apply(lastThis, lastArgs);
        }
    };
    return debounced;
}
