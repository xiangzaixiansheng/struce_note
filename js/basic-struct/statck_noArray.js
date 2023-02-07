class Stack {
    constructor() {
        this.item = {}
        this.count = 0
    }

    //栈顶添加
    push(item) {
        this.item[this.count] = item
        this.count++
    }

    //删除
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--;
        const result = this.item[this.count];
        delete this.item[this.count];
        return result;
    }

    //查看栈顶元素
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.item[this.count]
    }

    //清空栈
    clear() {
        this.item = {}
        this.count = 0
    }

    //栈是否为空
    isEmpty() {
        return this.count === 0
    }

    //查看栈长度
    size() {
        return this.count
    }

    //创建toString方法
    toString() {
        if (this.isEmpty()) {
            return ``
        }
        let str = `${this.item[0]}`
        for (let i = 1; i < this.count; i++) {
            str += `,${this.item[i]}`
        }
        return str
    }
}