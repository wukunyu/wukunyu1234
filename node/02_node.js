console.log('this is a module')

const testVar = 100

function testFun(){
    console.log(testVar)
}

module.exports.testVar = testVar
module.exports.testFun = testFun