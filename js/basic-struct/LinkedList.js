class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 链表
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // 追加元素
    //this.head存第一个元素。如果this.head有存在元素的话,
    //一直遍历把最新的node放在最后的next里面
    append(element) {
        const node = new Node(element);
        let current = null;
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) { //遍历到最后的节点
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element);
            let current = this.head;
            let previous = null;
            let index = 0;
            if (position === 0) {
                this.head = node;
                node.next = current;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        }
        return false;
    }

    // 移除指定位置元素
    removeAt(position) {
        // 检查越界值
        if (position > -1 && position < this.length) {
            let current = this.head;
            let previous = null;
            let index = 0;
            if (position === 0) {
                this.head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        }
        return null;
    }

    // 寻找元素下标
    findIndex(element) {
        let current = this.head;
        let index = -1;
        while (current) {
            if (element === current.element) {
                return index + 1;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    // 删除指定文档
    remove(element) {
        const index = this.findIndex(element);
        return this.removeAt(index);
    }

    isEmpty() {
        return !this.length;
    }

    size() {
        return this.length;
    }

    // 转为字符串
    toString() {
        let current = this.head;
        let string = "";
        while (current) {
            string += ` ${current.element}`;
            current = current.next;
        }
        return string;
    }
}
const linkedList = new LinkedList();

console.log(linkedList);
linkedList.append(2);
linkedList.append(6);
linkedList.append(24);
linkedList.append(152);

linkedList.insert(3, 18);

console.log(linkedList.toString());
console.log(linkedList.findIndex(24));

// {
//     "head":{
//         "element":2,
//         "next":{
//             "element":6,
//             "next":{
//                 "element":24,
//                 "next":{
//                     "element":18,
//                     "next":{
//                         "element":152,
//                         "next":null
//                     }
//                 }
//             }
//         }
//     },
//     "length":5
// }