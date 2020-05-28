import MyClass from './test/decorater'
import './test/babel'
import './app'

MyClass.run('test')
const myClass = new MyClass('Shepherd', 'Young')
console.log(myClass.name())
// myClass.name = function () { alert(100) } // readonly重新赋值会报错
myClass.bar()
myClass.deprecate()
