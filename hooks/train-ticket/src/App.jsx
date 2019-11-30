import React, { Fragment, useEffect, useState, useCallback, useRef } from 'react'
import './App.css'
let id = new Date().getTime()
function Controll(props) {
  const inputRef = useRef()
  const { addTodo } = props
  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if (newText.length === 0) {
      return
    }
    addTodo({
      id: ++id,
      text: newText,
      complete: false
    })
    inputRef.current.value = ''
  }
  return (
    <Fragment><h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} className="new-todo" placeholder='what is your todo' />

      </form>
    </Fragment>

  )
}
function TodoItem(props) {
  const { item, toggleTodo, removeTodo } = props
  const { id, text, complete } = item
  return (
    <li className={complete ? 'complete' : ''}>
      <input type="checkbox" onChange={() => {
        toggleTodo(id)
      }} />
      {text} <button onClick={() => {
        removeTodo(id)
      }}>x</button></li>
  )
}

function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props
  return (
    <ul>
      {
        todos.map(item => {
          return <TodoItem item={item} key={item.id} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        })
      }
    </ul>
  )

}

function Todolist() {
  const [todos, setTodos] = useState([])
  console.log(todos)
  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(item => {
      return item.id !== id
    }))
  }, [])
  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(item => {
      return item.id === id ? {
        ...item,
        complete: !item.complete
      } : item
    }))
  }, [])

  useEffect(() => {
    const todos = JSON.parse(window.localStorage.getItem('item'))
    setTodos(todos)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('item', JSON.stringify(todos) || '[]')
  }, [todos])
  return (
    <div className="todolist">
      <Controll addTodo={addTodo} />
      <Todos toggleTodo={toggleTodo} removeTodo={removeTodo} todos={todos} />
    </div>

  )
}

export default Todolist