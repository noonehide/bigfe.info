function Parent() {
    this.names = ['kevin', 'daisy'];
}

Parent.prototype.ages = [11, 12]

function Child() {
    Parent.call(this, arguments)
}

const c1 = new Child();

const c2 = new Child();

console.log('c1', c1.names)

console.log('c1', c1.ages)