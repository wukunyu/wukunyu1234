function myInstanceof(left, right) {
  if (typeof o !== 'object' || left === null) return false;
  let pro = Object.getPrototypeOf(left);
  while (true) {
    console.log(pro)
    if (pro === right.prototype) {
      return true;
    }
    if (pro === null) {
      return false
    }
    pro = Object.getPrototypeOf(pro);
  }
}
// console.log(myInstanceof({}, Object));
let ret = []
function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flat(arr[i])
    } else {
      ret.push(arr[i])
    }
  }
  return ret
}

function flat2(arr) {
  return arr.reduce((accumulator, current) => {
    return Array.isArray(current) ? accumulator.concat(flat2(current)) :
      accumulator.concat(current)
  }, [])
}
function flat3(arr) {
  while (arr.some((item => Array.isArray(item)))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flat3([[1, [2, 3, [4], 5, [6]], 7]]))

