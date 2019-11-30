Array.prototype.myMap = function (cb, scope) {
  // 判断类型
  if (!Array.isArray(this)) {
    throw new TypeError("不是数组。。。。")
  }
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`)
  }
  let T = Object(this) // arr
  let len = T.length, ret = []

  for (let i = 0; i < len; i++) {
    ret.push(cb.call(scope, T[i], i, T))
  }
  return ret
}

Array.prototype.myReduce = function (cb, initialValue) {
  if (!Array.isArray(this)) {
    throw new TypeError('不是数组。。。')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`)
  }
  let T = Object(this)
  let len = T.length, k = 0
  if (len === 0) {
    throw new Error('array is empty...')
  }
  if (initialValue === undefined) {
    initialValue = T[0]
    k++
  }
  let accumulator = initialValue
  for (; k < len; k++) {
    accumulator = cb.call(undefined, accumulator, T[k], k, T)
  }
  return accumulator
}

Array.prototype.myPush = function (v) {
  console.log(this)
  let T = Object(this)
  if (!Array.isArray(T)) {
    throw new TypeError('不是数组。。。')
  }
  let len = T.length
  T[len] = v
  return v
}

Array.prototype.myPop = function () {
  let T = Object(this), ret
  if (!Array.isArray(T)) {
    throw new TypeError('不是数组。。。')
  }

  let len = T.length;
  if (len === 0) {
    throw new TypeError('empty array')
  }
  ret = T[len - 1]
  delete T[len - 1]
  T.length = len - 1
  return ret
}

Array.prototype.myFilter = function (cb, scope) {
  let T = Object(this)
  if (!Array.isArray(T)) {
    throw new TypeError('不是数组。。。')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`)
  }
  let len = T.length, ret = []
  if (len === 0) {
    throw new TypeError('array is empty...')
  }
  for (let i = 0; i < len; i++) {
    if(cb.call(scope, T[i], i, T )){
      ret.push(T[i])
    }
  }
  return ret
}
let arr = []
// ret = arr.myMap((item, index, a) => {
//   return `<p>${item}-${index}-${a}</p>`
// })
// let arr2 = [1, 2, [3, [4, [5], 6, [7]]]]
// let flat = (arr2) => {
//   return arr2.myReduce((accumulator, current) => {
//     return Array.isArray(current) ? accumulator.concat(flat(current)) : accumulator.concat(current)
//   }, [])
// }

// ret = arr.myReduce((accumulator, currentValue, currentIndex, array) => {
//   return accumulator + currentValue
// })
// arr.myPush('wky')
ret = arr.myFilter(item => item < 3)
console.log(ret)
// console.log(flat(arr2))
// console.log(ret)

