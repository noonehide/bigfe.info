function Parent() {
    this.names = ['kevin', 'daisy'];
}

Parent.prototype.ages = [11, 12]

function Child() {
    Parent.call(this, arguments)
}

// 实现继承的核心函数
function inheritPrototype(subType, superType) {
    // 也可以用Object.create()
    function F() { };
    //F()的原型指向的是superType
    F.prototype = superType.prototype;
    //subType的原型指向的是F()
    subType.prototype = new F();
    // 重新将构造函数指向自己，修正构造函数
    subType.prototype.constructor = subType;
}

inheritPrototype(Child, Parent)

var child1 = new Child();
var child2 = new Child();

child1.names.push('yayu');
child1.ages.push(13)

console.log(child1.names); // ["kevin", "daisy", "yayu"]
console.log(child1.ages); // [11, 12]

console.log(child2.names); // ["kevin", "daisy"]
console.log(child2.ages)