class LRUCache {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }

    get(key) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            const val = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, val);
            return val;
        } else {
            return -1;
        }
    }

    put(key, val) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            this.cache.delete(key);
        }
        this.cache.set(key, val)
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value); //删除第一条数据
        }
    }
}

let map = new Map();
map.set('1', 11);
map.set('2', 22);
map.set('3', 33);
map.set('4', 44);
map.set('5', 55);
map.set('5', 66);
console.info(map.keys().next().value)