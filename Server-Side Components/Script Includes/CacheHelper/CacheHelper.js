var CacheHelper = Class.create();
CacheHelper.prototype = {

    logIt : false,

    initialize: function(log) {
        this.logIt = log;
    },

    /**
     * Adds data to the cache
     * 
     * @param {string} cacheName : cache name
     * @param {string} key : unique cache key 
     * @param {any} data : any data to be cached
     */
    addToCache: function(cacheName, key, data) {
        this._validateCacheName(cacheName);
        this._validateCacheKey(key);

        GlideCacheManager.put(cacheName, key, data);
    },

    /**
     * Removes data from cache
     * 
     * @param {string} cacheName : cache name
     * @param {string} key : unique cache key 
     * @returns cached data
     */
    getFromCache: function(cacheName, key) {
        this._validateCacheName(cacheName);
        this._validateCacheKey(key);

        var data = GlideCacheManager.get(cacheName, key);
        return data;
    },

    removeFromCache: function(cacheName) {
        this._validateCacheName(cacheName);
        
        GlideCacheManager.flush(cacheName);
    },

    /**
     * Either gets the data from cache or calls the callback functions, get the data and then adds it to the cache
     * @param {string} cacheName : cache name
     * @param {string} key : unique cache key 
     * @param {function} dataCallBack : call back function that returns the data to be cached
     * @returns data from the cache or based on call back function
     */
    getOrAddToCache: function(cacheName, key, dataCallBack) {
        this._validateCacheName(cacheName);
        this._validateCacheKey(key);

        var data = GlideCacheManager.get(cacheName, key);

        if (gs.nil(data)) {
            data = dataCallBack();
            GlideCacheManager.put(cacheName, key, data);
            if(this.logIt) gs.debug("Data from source.");
            return data;
        }

        if(this.logIt) gs.debug("Data from cache.");
        return data;
    },

    _validateCacheName :function(cacheName){
        if(!cacheName) throw new Error("cacheName is required");
    },

    _validateCacheKey :function(cacheKey){
        if(!cacheKey) throw new Error("cacheKey is required");
    },

    type: 'CacheHelper'
};