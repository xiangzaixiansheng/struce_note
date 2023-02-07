function deepClone(target) {
    if (target !== null && typeof target === 'object') {
        let result = Object.prototype.toString.call(target) === "[object Array]" ? [] : {};
        for (let k in target) {
            if (target.hasOwnProperty(k)) {
                result[k] = deepClone(target[k])
            }
        }
        return result;
    } else {
        return target;
    }
}