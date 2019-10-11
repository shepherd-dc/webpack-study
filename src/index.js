const hello = require('./hello')
const world = require('./world')
// const babel = require('./babel')

console.log(`${hello} ${world}`)
// console.log(babel)

export default class myLab {
  constructor (a) {
    this.a = a
    console.log(a)
  }
}