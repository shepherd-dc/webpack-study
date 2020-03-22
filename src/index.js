import hello from './test/hello'

console.log(hello)

document.querySelector('#app').innerHTML = 'Hello Webpack'

export default class myLab {
  constructor (a) {
    this.a = a
    console.log(a)
  }
}
