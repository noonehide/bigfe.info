function Parent() {
    this.names = ['kevin', 'daisy'];
}

Parent.prototype.ages = [11, 12]


function Child() {
    Parent.call(this)
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child();

child1.names.push('yayu');
child1.ages.push(13)

console.log(child1.names); // ["kevin", "daisy", "yayu"]
console.log(child1.ages); // [11, 12, 13]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
console.log(child2.ages); // [11, 12, 13] 原型对象共享