import React, { Component, useState, useEffect, useContext, createContext } from 'react'

const CountContext = createContext()


class Foo extends Component {
  render() {
    return (
      <div>
        <CountContext.Consumer>{
          count => <p>{count}</p>
        }</CountContext.Consumer>
      </div>
    )
  }
}

class Bar extends Component{
  static contextType = CountContext
  render() {
    const count = this.context
    return (
      <p>{count}</p>

    )
  }
}

function Counter(){
 const count =  useContext(CountContext)
  return (
    <p>{count}</p>

  )
}

function App() {
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  const [count, setCount] = useState(() => {
    return 0
  })
  const [size, setSize] = useState(() => {
    console.log('onit')
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  })
  useEffect(() => {
    document.title = count
  })
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      console.log('remove')
      window.removeEventListener('resize', onResize, false)
    }
  }, []) // 数组的每一项都不变，才不会执行=》有一项变就会执行

  useEffect(() => {
    console.log('count', count)
  }, [count])

  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>{count}
        size: {size.width}x{size.height}
      </button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>

  )
}

export default App