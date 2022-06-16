function _new(constructor, ...arg) {
    // 创建一个空对象
    var obj = {};
    // 空对象的`__proto__`指向构造函数的`prototype`, 为这个新对象添加属性 
    obj.__proto__ = constructor.prototype;
    // 构造函数的作用域赋给新对象
    var res = constructor.apply(obj, arg);
    // 返回新对象.如果没有显式return语句，则返回this
    return Object.prototype.toString.call(res) === '[object Object]' ? res : obj;
}

function instanceOf(father, child) {
    const fp = father.prototype
    var cp = child.__proto__

    while (cp) {
        if (cp === fp) {
            return true
        }
        cp = cp.__proto__
    }
    return false
}


//instance_of
function _Instanceof(instance, Constructor) {
    if (typeof instance !== "object") {
        throw "the instance must be 'Object'";
    }
    if (typeof Constructor !== "function") {
        throw "the Contructor must be 'Function'"
    }

    let prototype = instance.__proto__;
    // 遍历链表用while
    while (prototype) {
        if (!prototype.__proto__) {
            return false;
        } else if (prototype === Constructor.prototype) {
            return true;
        } else {
            prototype = prototype.__proto__;
        }
    }
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person1 = new Person("张三", 25);
let person2 = {
    name: "张三",
    age: 25
}

console.info(_Instanceof(person1, Person))