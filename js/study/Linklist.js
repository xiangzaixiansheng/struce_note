class Node {
    constructor(ele) {
        this.ele = ele;
        this.next = null;
    }
}

class Linklist {
    constructor() {
        this.header = null;
        this.length = 0;
    }

    //新增数据
    append(ele) {
        const node = new Node(ele);
        let current = null;
        if (this.header === null) {
            this.header = node;
        } else {
            current = this.header;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    insert(position, ele) {
        let current = null;
        let previous = null;
        let index = 0;
        if (position >= 0 && position < this.length) {
            const node = new Node(ele);
            current = this.header;
            if (position == 0) {
                //把当前的node替换成第一个
                this.header = node;
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
        } else {
            return false;
        }
    }

    //删除指定位置元素
    removeAt(position) {
        let current = null;
        let previous = null;
        let index = 0;
        if (position >= 0 && position < this.length) {
            current = this.header;
            if (position == 0) {
                //把第二个node替换成第一个
                this.header = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return true;
        } else {
            return false;
        }
    }

    // 寻找元素下标
    findIndex(element) {
        let current = this.head;
        let index = -1;
        while (current) {
            if (element === current.ele) {
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