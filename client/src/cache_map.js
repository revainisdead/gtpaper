function cacheMap() {
    this.cache = {};
}

cacheMap.prototype = {
    add: function(obj) {
        const str = JSON.stringify(obj);

        // Save to cache by specifying string of object as key
        this.cache[str] = obj;
    },
    contains: function(obj) {
        const str = JSON.stringify(obj);

        return str in this.cache;
    },
    // get?
    // delete?
}

const inMemoryCache = new cacheMap();

function test() {
    const testObj = {
        "key1": "Name",
        "key2": [1, 2, 3],
    };

    inMemoryCache.add(testObj);
    console.log(inMemoryCache.contains(testObj));
}
test();

export default inMemoryCache;
