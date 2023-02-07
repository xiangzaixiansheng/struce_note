// ● 共同点
// 三者都是对象

// ● Map 和 Objects 的区别
// ①：Object的键只能是字符串或者Symbols，Map的键可以是任何类型。

// ②：Map中的键值遵循FIFO原则，即有序的。而Object添加的键则不是。

// ③：Map中的键值对可以通过size来计算，Object需要我们手动计算。

// ④：Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。


let map = new Map();

map.set('key1', 1)
map.set('key2', 2)

let map2 = new Map();

map2.set('key3', 3)
map2.set('key4', 4)

//两个map的合并
let bigMap = new Map([...map, ...map2])
bigMap.set('bigMap', 'bigMap');


for (let [key, value] of bigMap) {
    console.info(`key:${key}   value:${value}`);
}