---
title: 闭包
date: 2020-05-29
---

## Javascript 的执行上下文(Excution Context，简称 EC)

JS 是单线程的，运行在全局 EC，每进入一个 function，就做一次入栈操作，向栈顶压入一个属于该 function 的新的 EC。若 function 中又调用了另一个 function，则再执行一次入栈…依次执行完再依次出栈，回到全局 EC。全局 EC 一定是在栈底，在浏览器关闭后出栈。

> 代码执行流程如下

```js
var color = "blue";
function changeColor() {
  var anotherColor = "red";
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  }
  swapColors();
}
changeColor();
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gkneoa3wgyj31jo0geta7.jpg)

> EC 构成如下
> ![](https://tva1.sinaimg.cn/large/0081Kckwly1gknjdiw43fj30jg0bsaag.jpg)

- 变量对象 VO（Variable Object）保存此 EC 中涉及到的变量。
- 作用域链保存着此 EC 中的 VO 与其他 EC 中的 VO 的关联关系（能否访问到）。
- 然后是 this，在 EC 被创建时，会确定 this 的指向。

## Javascipt 的作用域

作用域是指程序源代码中定义变量的区域,它定义了如何查找变量，也就是当前执行代码对变量的访问权限

- js 使用的是词法作用域，也就是静态作用域
- js 中函数的作用域在函数定义的时候已经决定了
- 一个文档流中 Js 代码执行顺序大概如下
  - 读入第一个代码片段
  - 进行词法分析，检查语法错误
  - 对 var 和 function 进行预解析，也就是变量提升
  - 执行代码段
  - 如果还有下一段继续读

> 先执行变量提升，再进行函数执行

```js
var name = "window";
function display() {
  alert(name); // 这里容易犯错，以为是window，但是在代码执行前，会进行变量提升，var name,所以是undefined
  var name = "local";
  alert(name);
}

display();
// undefined, local
```

> 静态词法作用域，根据书写位置确认查找变量

```js
var value = 1;
function foo() {
  console.log(value);
}
function bar() {
  var value = 2;
  foo();
}
bar();
```

- 执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

- 假设 JavaScript 采用动态作用域，让我们分析下执行过程：
  执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

## Javascript 的作用域链

执行环境 EC 中的 scopeChain（作用域链），是由当前内存中各个变量对象 VO 串起来的单向链表，每入栈执行一个 function，其对应的 VO 就添加到作用域链的头部，前一个 VO 能自由访问到下一个 VO 上的变量，反过来就不行

> VO(innerTest)能顺着单向链访问到 VO(test)，所以能访问到 test 中定义的 b。反过来 VO(test)在链中的位置无法访问到 VO(innerTest)，所以 test 无法访问到 innerTest 中定义的 c

```js
var a = 20;

function test() {
    var b = a + 10;

    function innerTest() {
        var c = 10;
        return b + c;
    }

    return innerTest();
}

test();

// innerTestEC如下
innerTestEC = {
    VO: {...},  // 变量对象
    scopeChain: [VO(innerTest), VO(test), VO(global)], // 作用域链
    this: {}
}

```

## 闭包和它的应用场景

由于 JS 使用的静态作用域，函数里的变量查找规则一开始就已经订好了，并且由于作用域链限制，外层函数不能获取内层函数的变量，所以就有了闭包的概念
简单来说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包

> 最简单的例子

```js
function f1() {
  var n = 999;
  function f2() {
    alert(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

### 闭包的应用

#### 模拟私有方法

```js
function Counter() {
  var count = 0;
  return {
    decrement: function() {
      count--;
    },
    increment: function() {
      count++;
    },

    getCount: function() {
      return count;
    },
  };
}
const cout = Counter();
cout.decrement();
cout.decrement();
console.log("c", cout.getCount());

// -2
```

#### 解决全局变量的问题

- 几个函数的 console.log 的 i 指向同一个 i, 是由于 var 把变量 i 提升了作用域范围，所以打印出来的是一个值

```js
for(var i = 0; i< 5; i ++) {
    setTimeout(fuction(){
        console.log('i',i)
    }, 100)
}
// 5,5,5,5,5
```

- test 函数为每一个回调创建一个新的词法环境。在这些环境中，i 指向正确的数字

```js
// 静态词法作用域，console.log的i是传入的i，这个i是外部传入的动态数字
function test(i) {
  return function() {
    console.log(i);
  };
}

for (var i = 0; i < 5; i++) {
  setTimeout(test(i), 100);
}
```

- 通过匿名闭包，创建独立的作用域

```js
for (var i = 0; i < 5; i++) {
  (function(a) {
    setTimeout(() => {
      console.log(a);
    }, 100);
  })(i);
}
```

- es6 的 let,块级作用域

```js
for(let i = 0; i< 5; i ++) {
    setTimeout(fuction(){
        console.log('i',i)
    }, 100)
}
```

## 闭包缺点

- 被引用的私有变量不能被销毁，增大了内存消耗，造成内存泄漏，解决方法是可以在使用完变量后手动为它赋值为 null；
