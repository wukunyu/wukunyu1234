Function.prototype.myCall = function(context, ...rest){
  context.fn = this
  context.fn(...rest)
}

let o = {
    name: 'w',
    age: 20
}

function fn(){
  console.log(this.name, this.age)
  console.log(arguments)
}
fn.myCall(o, 1,2,3)