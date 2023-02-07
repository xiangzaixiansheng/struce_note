//手写实现promise.all
Promise.myAll = function(promiseArr) {
    return new Promise((resolve, reject) => {
        const ans = [];
        let index = 0;
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then((res) => {
                ans[i] = res;
                index++;
                if (index === promiseArr.length) {
                    resolve(ans);
                }
            }).catch((e) => {
                reject(e);
            })
        }
    });
}

//时间阻塞
//await new Promise(resolve => setTimeout(resolve, 3000));

//promise的race
Promise.race = function(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            // 如果不是Promise实例需要转化为Promise实例
            Promise.resolve(p).then(
                val => resolve(val),
                err => reject(err),
            )
        })
    })
}

//promise 并发数限制
/***
 *主要思路是block中的延时执行const p = ()=>({}); p();执行
 */
class Scheduler {
    constructor() {
        this.queue = [];
        this.maxCount = 2;
        this.runCounts = 0;
        this.lock = [];
    }
    add(promiseCreator) {
        this.queue.push(promiseCreator);
    }
    taskStart() {
        for (let i = 0, l = this.queue.length; i < l; i++) {
            this.request();
        }
    }

    // 阻塞函数
    block() {
        let _resolve;
        return new Promise((resolve, reject) => {
            _resolve = resolve;
            // resolve不执行,将其推入lock数组;
            this.lock.push(_resolve);
        });
    }

    // 叫号机
    next() {
        this.lock.length && this.lock.shift()();
    }

    async request() {
        if (!this.queue || !this.queue.length) {
            return;
        }

        if (this.runCounts >= this.maxCount) {
            //超过限制利用await和promise进行阻塞;
            await this.block();
        }
        if (this.queue.length > 0) { //队列中还有数据的话
            console.log(`运行的代码数`, this.runCounts);
            this.runCounts++;
            await this.queue.shift()();
            this.runCounts--;
            this.next();
        }
    }
}

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => (timeout(time).then(() => console.log(order))))
}


addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.taskStart();


///执行顺序