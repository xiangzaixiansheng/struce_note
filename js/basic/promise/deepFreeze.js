//console.info(Object.getOwnPropertyNames(test_obj))

//如果只是希望一个对象原有的属性值可以修改，但是不能添加或者删除属性，Object.seal()能够帮我们做到
//object.freeze()

function deepFreeze(object) {
    // Retrieve the property names defined on object
    let propNames = Object.getOwnPropertyNames(object);
    // Freeze properties before freezing self
    for (let name of propNames) {
        let value = object[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}

//自己写的版本
function deepFreeze_v2(obj) {
    let propName = Object.getOwnPropertyNames(obj);
    for (let name of propName) {
        let value = obj[name];
        if (value && typeof value == 'object') {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}

const test_obj = {
    test: "test",
    hello: "hello",
    test2: {
        test2: "test2"
    }
}
deepFreeze(test_obj);
test_obj.test2.test2 = 6
test_obj.test = 6


console.info(test_obj)