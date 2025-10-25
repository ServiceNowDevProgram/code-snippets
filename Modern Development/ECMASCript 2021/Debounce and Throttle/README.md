# Debounce and Throttle

Utility functions to control how often a function executes during frequent events.

## Overview

**Debounce** - Waits until user stops action before executing (e.g., search input, auto-save)
**Throttle** - Limits execution to once per time interval (e.g., scroll, resize)

## Files

- `debounce.js` - 3 debounce variations
- `throttle.js` - 4 throttle variations  
- `combined-usage.js` - Real-world examples

## Quick Examples

### Debounce
```javascript
const handleSearch = debounce((query) => {
    // API call after user stops typing
    fetch(`/api/search?q=${query}`);
}, 300);

inputElement.addEventListener('input', e => handleSearch(e.target.value));
```

### Throttle
```javascript
const handleScroll = throttle(() => {
    // Update every 300ms during scroll
    updateScrollBar();
}, 300);

window.addEventListener('scroll', handleScroll);
```

## Use Cases

**Debounce:** search input, auto-save, form validation
**Throttle:** scroll events, window resize, animations
