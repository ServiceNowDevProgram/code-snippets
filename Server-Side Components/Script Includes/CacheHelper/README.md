# BenchmarkRunner
Just a wrapper around GlideCacheManager with methods to enable validation of Cache key and data and ability to use the GlideCacheManager easily.

## Example server-side call (background script)
```javascript
var cacheName = "rahman_test";
var cacheKey = "1";

var helper = new CacheHelper(false);

// Either get the data from cache or add it
var data = helper.getOrAddToCache(cacheName, cacheKey, function(){
    gs.log("This will be called if the data is not in the cache. The second time will not be called.");

    // This will be called if the data is not in cache!!!
    var data = {
        name: "rahman",
    }

    return data;
})

gs.log(JSON.stringify(data));

//helper.removeFromCache(cacheName)