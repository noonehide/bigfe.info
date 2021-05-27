---
title: EventLoop
date: 2020-05-27
---

## why EventLoop

* 因为JS是单线程的，但是如果是耗时较久的任务处理，则会影响性能，所以需要异步来处理这些任务。

* javascript 的任务分为两种同步和异步，同步任务在主线程上按照顺序执行，异步任务放在任务队列中，如果有多个异步任务则需要在异步队列中排队等待，任务队列类似于缓冲区，任务下一步会被移除调用栈，然后主线程执行调用栈的任务

## what

* 简单来说就是事件循环
* 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghu94j7fqaj30c40lf76j.jpg)

* 更加形象的顺序
![7ca4ad85c4cf71f30c9319a9bd9ee795](https://tva1.sinaimg.cn/large/007S8ZIlly1ghu94mnpoqj30no0l4q3r.jpg)


## 浏览器中的Eventloop

### macro-task(宏任务)

*     setTimeout
*     setInterval
*     io操作
*     script

### micro-task(微任务)

* new Promise.then
* MutationObserver

### requestAnimationFrame
它是异步执行的，但是它既不属于宏任务，也不属于微任务。它的回调函数在浏览器下一次重绘前执行
，他在Micro-task之后执行

> 简易demo代码执行如下

```js
setTimeout(function() {
    // 加入到宏任务
    console.log('setTimeout');
})

new Promise(function(resolve) {
    // Promise的构造方法是同步执行
    console.log('promise');
    resolve(true)
}).then(function() {
    // 微任务
    console.log('then');
})

// 同步执行
console.log('console');
```
所以他的顺序是 promise => console => then => setTimeout

> 复杂

```js
       // 同步执行
        // 同步1
        console.log("打印" + 1);
        // 加入宏任务队列
        setTimeout(function () {
            console.log("打印" + 2);
        });
        //
        new Promise(function (resolve, reject) {
            // 同步执行2
            console.log("打印" + 3);
            resolve();
        }).then(function () {
            // 加入异步任务队列
            console.log("打印" + 4)
        }
        );

        // 同步执行3
        console.log("打印" + 10);
        new Promise(function (resolve, reject) {
            // 加入宏任务队列  
            setTimeout(function () {
                console.log("打印" + 5);
            });
            resolve();
        }).then(
            function () {
                // 加入异步任务队列
                console.log("打印" + 6)
            }
        );
        setTimeout(function () {
            // 加入宏任务  
            new Promise(function (resolve, reject) {
                console.log("打印" + 7);
            });
        });
```
同步1：打印1， 宏任务1: 打印2， 同步2：打印3， 微任务1: 打印4，同步3: 打印10， 宏任务3: 打印5， 微任务2: 打印6，宏任务4: newPromise
第一轮执行完成可得 （同步）1，3，10, (微任务)4,6 （宏任务）2,5，7


## Node中的Eventloop
Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。浏览器的Event loop是在HTML5中定义的规范，而node中则由libuv库实现。
它的实行顺序如下: 
![node—eventloop](https://tva1.sinaimg.cn/large/007S8ZIlly1ghu94jff2mj309z097jr6.jpg)

* timers阶段，执行timer,setTimeout和setInterval的回调
* iocallback，执行io回调
* idle,prepare,node内部回调
* poll阶段，获取新的IO事件
* check阶段，执行setImmediate回调
* closecallback，执行socket的close事件


### macroTask

* setTimeout
* setInterval
* IO操作

### micoTask

* Promise.then
* process.nextTick
    * 这个函数其实独立于EventLoop之外，他有一个自己的队列，每个阶段完成后，如果存在nextTick队列，就会清空队列中所有回调函数,优先于micoTask

## Node与浏览器的差异

![Node与浏览器的差异](https://tva1.sinaimg.cn/large/007S8ZIlly1ghu94j374zj30t709kjrv.jpg)

* Node端，microtask在事件循环的各个阶段之间执行
* 浏览器端，microtask在每个macrotask执行完之后执行
