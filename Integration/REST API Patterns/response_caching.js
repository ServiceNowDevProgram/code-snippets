/**
 * API Response Caching Mechanism for ServiceNow
 * 
 * This script provides intelligent caching for REST API responses
 * to improve performance and reduce external API calls.
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Integration/Performance
 */

var ApiResponseCache = Class.create();
ApiResponseCache.prototype = {
    
    initialize: function(options) {
        this.defaultTtlSeconds = options.defaultTtlSeconds || 300; // 5 minutes
        this.maxCacheSize = options.maxCacheSize || 1000;
        this.cachePrefix = options.cachePrefix || 'api_cache';
        this.compressionEnabled = options.compressionEnabled !== false;
        this.encryptionEnabled = options.encryptionEnabled || false;
        this.evictionPolicy = options.evictionPolicy || 'lru'; // lru, lfu, ttl
        this.statsEnabled = options.statsEnabled !== false;
        
        // Initialize stats
        if (this.statsEnabled) {
            this._initializeStats();
        }
    },
    
    /**
     * Get cached response or execute API call
     * @param {string} cacheKey - Unique cache key
     * @param {Function} apiCall - Function to execute if cache miss
     * @param {Object} options - Cache options
     * @returns {Object} Cached or fresh API response
     */
    getOrExecute: function(cacheKey, apiCall, options) {
        options = options || {};
        var ttlSeconds = options.ttlSeconds || this.defaultTtlSeconds;
        var forceRefresh = options.forceRefresh || false;
        var tags = options.tags || [];
        
        var fullKey = this._buildCacheKey(cacheKey);
        
        // Check cache first (unless force refresh)
        if (!forceRefresh) {
            var cachedResult = this._getCachedValue(fullKey);
            if (cachedResult.found) {
                this._recordCacheHit(fullKey);
                return {
                    success: true,
                    data: cachedResult.data,
                    cached: true,
                    cacheKey: fullKey,
                    timestamp: cachedResult.timestamp,
                    ttl: cachedResult.ttl
                };
            }
        }
        
        // Cache miss - execute API call
        this._recordCacheMiss(fullKey);
        
        try {
            var startTime = new GlideDateTime().getNumericValue();
            var apiResponse = apiCall();
            var executionTime = new GlideDateTime().getNumericValue() - startTime;
            
            // Determine if response should be cached
            if (this._shouldCache(apiResponse, options)) {
                this._setCachedValue(fullKey, apiResponse, ttlSeconds, {
                    tags: tags,
                    executionTime: executionTime
                });
            }
            
            return {
                success: true,
                data: apiResponse,
                cached: false,
                cacheKey: fullKey,
                executionTime: executionTime
            };
            
        } catch (e) {
            gs.error('ApiResponseCache: Error executing API call for key ' + fullKey + ': ' + e.message);
            
            // Return stale data if available and configured
            if (options.returnStaleOnError) {
                var staleResult = this._getStaleValue(fullKey);
                if (staleResult.found) {
                    gs.info('ApiResponseCache: Returning stale data for key ' + fullKey);
                    return {
                        success: true,
                        data: staleResult.data,
                        cached: true,
                        stale: true,
                        cacheKey: fullKey,
                        error: e.message
                    };
                }
            }
            
            return {
                success: false,
                error: e.message,
                cacheKey: fullKey
            };
        }
    },
    
    /**
     * Invalidate cache entries by key or pattern
     * @param {string|Array} keys - Single key, array of keys, or pattern
     * @param {Object} options - Invalidation options
     */
    invalidate: function(keys, options) {
        options = options || {};
        var pattern = options.pattern || false;
        var tags = options.tags || [];
        
        if (typeof keys === 'string') {
            keys = [keys];
        }
        
        var invalidatedCount = 0;
        
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            
            if (pattern) {
                invalidatedCount += this._invalidateByPattern(key);
            } else {
                var fullKey = this._buildCacheKey(key);
                if (this._removeCachedValue(fullKey)) {
                    invalidatedCount++;
                }
            }
        }
        
        // Invalidate by tags if specified
        if (tags.length > 0) {
            invalidatedCount += this._invalidateByTags(tags);
        }
        
        gs.info('ApiResponseCache: Invalidated ' + invalidatedCount + ' cache entries');
        return invalidatedCount;
    },
    
    /**
     * Warm cache with predefined data
     * @param {Object} data - Key-value pairs to warm cache
     * @param {Object} options - Warming options
     */
    warmCache: function(data, options) {
        options = options || {};
        var ttlSeconds = options.ttlSeconds || this.defaultTtlSeconds;
        var tags = options.tags || [];
        
        var warmedCount = 0;
        
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var fullKey = this._buildCacheKey(key);
                this._setCachedValue(fullKey, data[key], ttlSeconds, {
                    tags: tags,
                    warmed: true
                });
                warmedCount++;
            }
        }
        
        gs.info('ApiResponseCache: Warmed cache with ' + warmedCount + ' entries');
        return warmedCount;
    },
    
    /**
     * Get cache statistics
     * @returns {Object} Cache statistics
     */
    getStats: function() {
        if (!this.statsEnabled) {
            return { error: 'Statistics not enabled' };
        }
        
        var stats = {
            hits: parseInt(gs.getProperty(this.cachePrefix + '.stats.hits', '0')),
            misses: parseInt(gs.getProperty(this.cachePrefix + '.stats.misses', '0')),
            sets: parseInt(gs.getProperty(this.cachePrefix + '.stats.sets', '0')),
            evictions: parseInt(gs.getProperty(this.cachePrefix + '.stats.evictions', '0')),
            errors: parseInt(gs.getProperty(this.cachePrefix + '.stats.errors', '0'))
        };
        
        stats.total = stats.hits + stats.misses;
        stats.hitRate = stats.total > 0 ? (stats.hits / stats.total * 100).toFixed(2) + '%' : '0%';
        stats.missRate = stats.total > 0 ? (stats.misses / stats.total * 100).toFixed(2) + '%' : '0%';
        
        return stats;
    },
    
    /**
     * Clear all cache entries
     */
    clearAll: function() {
        var clearedCount = 0;
        
        // Get all cache keys
        var gr = new GlideRecord('sys_properties');
        gr.addQuery('name', 'STARTSWITH', this.cachePrefix + '.data.');
        gr.query();
        
        while (gr.next()) {
            gs.setProperty(gr.name, '');
            clearedCount++;
        }
        
        // Clear metadata
        var metaGr = new GlideRecord('sys_properties');
        metaGr.addQuery('name', 'STARTSWITH', this.cachePrefix + '.meta.');
        metaGr.query();
        
        while (metaGr.next()) {
            gs.setProperty(metaGr.name, '');
        }
        
        gs.info('ApiResponseCache: Cleared ' + clearedCount + ' cache entries');
        return clearedCount;
    },
    
    /**
     * Create cache key with namespace
     * @param {string} key - Original key
     * @returns {string} Full cache key
     * @private
     */
    _buildCacheKey: function(key) {
        // Hash long keys to prevent property name length issues
        if (key.length > 100) {
            var hasher = new GlideChecksum();
            hasher.update(key);
            key = hasher.getMD5();
        }
        
        return this.cachePrefix + '.data.' + key;
    },
    
    /**
     * Get cached value with metadata
     * @param {string} fullKey - Full cache key
     * @returns {Object} Cache result
     * @private
     */
    _getCachedValue: function(fullKey) {
        try {
            var dataJson = gs.getProperty(fullKey);
            if (!dataJson) {
                return { found: false };
            }
            
            var cacheEntry = JSON.parse(dataJson);
            var now = new GlideDateTime().getNumericValue();
            
            // Check expiration
            if (cacheEntry.expires && now > cacheEntry.expires) {
                this._removeCachedValue(fullKey);
                return { found: false };
            }
            
            // Decompress if needed
            var data = cacheEntry.compressed ? 
                this._decompress(cacheEntry.data) : cacheEntry.data;
            
            // Decrypt if needed
            if (cacheEntry.encrypted) {
                data = this._decrypt(data);
            }
            
            return {
                found: true,
                data: data,
                timestamp: cacheEntry.timestamp,
                ttl: cacheEntry.ttl,
                metadata: cacheEntry.metadata || {}
            };
            
        } catch (e) {
            gs.error('ApiResponseCache: Error retrieving cached value: ' + e.message);
            this._recordCacheError();
            return { found: false };
        }
    },
    
    /**
     * Set cached value with metadata
     * @param {string} fullKey - Full cache key
     * @param {*} data - Data to cache
     * @param {number} ttlSeconds - Time to live in seconds
     * @param {Object} metadata - Additional metadata
     * @private
     */
    _setCachedValue: function(fullKey, data, ttlSeconds, metadata) {
        try {
            var now = new GlideDateTime().getNumericValue();
            var expires = ttlSeconds > 0 ? now + (ttlSeconds * 1000) : null;
            
            var cacheEntry = {
                data: data,
                timestamp: now,
                expires: expires,
                ttl: ttlSeconds,
                metadata: metadata || {}
            };
            
            // Encrypt if enabled
            if (this.encryptionEnabled) {
                cacheEntry.data = this._encrypt(cacheEntry.data);
                cacheEntry.encrypted = true;
            }
            
            // Compress if enabled
            if (this.compressionEnabled) {
                cacheEntry.data = this._compress(cacheEntry.data);
                cacheEntry.compressed = true;
            }
            
            // Check cache size limits
            this._enforceEvictionPolicy();
            
            // Store the entry
            gs.setProperty(fullKey, JSON.stringify(cacheEntry));
            
            // Store metadata separately for queries
            this._storeMetadata(fullKey, metadata);
            
            this._recordCacheSet();
            
        } catch (e) {
            gs.error('ApiResponseCache: Error setting cached value: ' + e.message);
            this._recordCacheError();
        }
    },
    
    /**
     * Remove cached value
     * @param {string} fullKey - Full cache key
     * @returns {boolean} True if removed
     * @private
     */
    _removeCachedValue: function(fullKey) {
        var existed = gs.getProperty(fullKey) !== null;
        gs.setProperty(fullKey, '');
        
        // Remove metadata
        var metaKey = fullKey.replace('.data.', '.meta.');
        gs.setProperty(metaKey, '');
        
        return existed;
    },
    
    /**
     * Determine if response should be cached
     * @param {*} response - API response
     * @param {Object} options - Cache options
     * @returns {boolean} True if should cache
     * @private
     */
    _shouldCache: function(response, options) {
        // Don't cache null/undefined responses
        if (response === null || response === undefined) {
            return false;
        }
        
        // Don't cache error responses (unless explicitly configured)
        if (response.haveError && response.haveError() && !options.cacheErrors) {
            return false;
        }
        
        // Don't cache large responses (unless configured)
        var responseSize = JSON.stringify(response).length;
        var maxSize = options.maxResponseSize || 100000; // 100KB default
        
        if (responseSize > maxSize) {
            gs.warn('ApiResponseCache: Response too large to cache: ' + responseSize + ' bytes');
            return false;
        }
        
        return true;
    },
    
    /**
     * Initialize statistics tracking
     * @private
     */
    _initializeStats: function() {
        var stats = ['hits', 'misses', 'sets', 'evictions', 'errors'];
        for (var i = 0; i < stats.length; i++) {
            var key = this.cachePrefix + '.stats.' + stats[i];
            if (!gs.getProperty(key)) {
                gs.setProperty(key, '0');
            }
        }
    },
    
    /**
     * Record cache hit
     * @param {string} key - Cache key
     * @private
     */
    _recordCacheHit: function(key) {
        if (this.statsEnabled) {
            var hits = parseInt(gs.getProperty(this.cachePrefix + '.stats.hits', '0'));
            gs.setProperty(this.cachePrefix + '.stats.hits', (hits + 1).toString());
        }
    },
    
    /**
     * Record cache miss
     * @param {string} key - Cache key
     * @private
     */
    _recordCacheMiss: function(key) {
        if (this.statsEnabled) {
            var misses = parseInt(gs.getProperty(this.cachePrefix + '.stats.misses', '0'));
            gs.setProperty(this.cachePrefix + '.stats.misses', (misses + 1).toString());
        }
    },
    
    /**
     * Record cache set operation
     * @private
     */
    _recordCacheSet: function() {
        if (this.statsEnabled) {
            var sets = parseInt(gs.getProperty(this.cachePrefix + '.stats.sets', '0'));
            gs.setProperty(this.cachePrefix + '.stats.sets', (sets + 1).toString());
        }
    },
    
    /**
     * Record cache error
     * @private
     */
    _recordCacheError: function() {
        if (this.statsEnabled) {
            var errors = parseInt(gs.getProperty(this.cachePrefix + '.stats.errors', '0'));
            gs.setProperty(this.cachePrefix + '.stats.errors', (errors + 1).toString());
        }
    },
    
    /**
     * Simple compression placeholder
     * @param {*} data - Data to compress
     * @returns {string} Compressed data
     * @private
     */
    _compress: function(data) {
        // Placeholder for compression logic
        return JSON.stringify(data);
    },
    
    /**
     * Simple decompression placeholder
     * @param {string} compressedData - Compressed data
     * @returns {*} Decompressed data
     * @private
     */
    _decompress: function(compressedData) {
        // Placeholder for decompression logic
        return JSON.parse(compressedData);
    },
    
    /**
     * Encrypt data
     * @param {*} data - Data to encrypt
     * @returns {string} Encrypted data
     * @private
     */
    _encrypt: function(data) {
        var encryption = new GlideEncrypter();
        return encryption.encrypt(JSON.stringify(data));
    },
    
    /**
     * Decrypt data
     * @param {string} encryptedData - Encrypted data
     * @returns {*} Decrypted data
     * @private
     */
    _decrypt: function(encryptedData) {
        var encryption = new GlideEncrypter();
        return JSON.parse(encryption.decrypt(encryptedData));
    },
    
    type: 'ApiResponseCache'
};

// Usage Examples:

/*
// Initialize cache
var cache = new ApiResponseCache({
    defaultTtlSeconds: 600, // 10 minutes
    maxCacheSize: 500,
    cachePrefix: 'my_api_cache',
    compressionEnabled: true,
    encryptionEnabled: false
});

// Get or execute with caching
var result = cache.getOrExecute('user_profile_123', function() {
    var rm = new sn_ws.RESTMessageV2();
    rm.setEndpoint('https://api.example.com/users/123');
    rm.setHttpMethod('GET');
    return rm.execute();
}, {
    ttlSeconds: 300, // Override default TTL
    tags: ['user_data', 'profiles'],
    returnStaleOnError: true
});

if (result.success) {
    gs.info('Got user data (cached: ' + result.cached + ')');
    // Use result.data
}

// Warm cache with known data
cache.warmCache({
    'config_data': { setting1: 'value1', setting2: 'value2' },
    'lookup_table': ['item1', 'item2', 'item3']
}, {
    ttlSeconds: 3600, // 1 hour
    tags: ['configuration']
});

// Invalidate specific cache entries
cache.invalidate(['user_profile_123', 'user_profile_456']);

// Invalidate by tags
cache.invalidate([], { tags: ['user_data'] });

// Get cache statistics
var stats = cache.getStats();
gs.info('Cache hit rate: ' + stats.hitRate + 
        ', Total requests: ' + stats.total);
*/
