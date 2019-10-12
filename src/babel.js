const arr = [1, 2, 3].map(i => i ** 2)
const obj = Object.assign({}, {
  a: 1
})
console.log(arr, obj)

const p = new Promise(
  () => {}
)
console.log(p)

const inc = [1, 2].includes(1)
const foo = 'foobar'.includes('foo')

console.log(inc, foo)
