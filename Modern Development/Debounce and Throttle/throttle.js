// Basic throttle - limit function execution to once per interval
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttle with timestamp - more precise timing
function throttleWithTimestamp(func, limit) {
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            const remaining = limit - (Date.now() - lastRan);
            if (remaining <= 0) {
                func.apply(this, args);
                lastRan = Date.now();
            }
        }
    };
}

// Throttle with leading and trailing options
function throttleAdvanced(func, wait, options = {}) {
    const { leading = true, trailing = false } = options;
    let timeout, previous = 0, lastArgs, lastThis;
    
    const throttled = function(...args) {
        const now = Date.now();
        if (!previous && !leading) previous = now;
        
        const remaining = wait - (now - previous);
        lastArgs = args;
        lastThis = this;
        
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            func.apply(this, args);
        } else if (!timeout && trailing) {
            timeout = setTimeout(() => {
                previous = leading ? Date.now() : 0;
                timeout = null;
                func.apply(lastThis, lastArgs);
            }, remaining);
        }
    };
    throttled.cancel = () => {
        clearTimeout(timeout);
        previous = 0;
    };
    return throttled;
}

// Throttle using requestAnimationFrame for smooth animation
function throttleRAF(func) {
    let frameId = null;
    return function(...args) {
        if (frameId) return;
        frameId = requestAnimationFrame(() => {
            func.apply(this, args);
            frameId = null;
        });
    };
}
