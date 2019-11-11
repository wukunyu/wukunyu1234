function myInstanceof(left, right) {
  if (typeof o !== 'object' || left === null) return false;
  let pro = Object.getPrototypeOf(left); // 
  while (true) {
    console.log(pro)
    if (pro === right.prototype) {
      return true;
    }
    if(pro === null){
        return false
    }
    pro = Object.getPrototypeOf(pro);
  }
}
console.log(myInstanceof({}, Object));

