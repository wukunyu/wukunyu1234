import React, { Component, useState, useEffect, useContext, createContext, useMemo, memo, useCallback } from 'react'


const Counter = memo(function Counter(props) {
  //  const count =  useContext(CountContext)
  console.log('memo')
  return (
    <p onClick={props.onClick}>{props.counter}</p>
  )
})

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
  const double = useMemo(() => {
    return count * 2
  }, [count === 3]) // 
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

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('click')
  //   }
  // }, [])
  const onClick = useCallback(()=>{
    console.log('click')
  },[])
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>{count}
        double: {double}
        {/* size: {size.width}x{size.height} */}
      </button>
      <Counter counter={double} onClick={onClick} />
    </div>

  )
}

export default App