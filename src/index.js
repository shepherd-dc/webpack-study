import hello from './hello'

// import babel from './babel'

// import(
//   /*
//   webpackChunkName: 'world'
//   */
//   'src/world'
// ).then(({ default: mod }) => {
//   console.log(mod)
// })
console.log(hello)

export default class myLab {
  constructor (a) {
    this.a = a
    // console.log(a)
  }
}
