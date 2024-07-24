import './App.css';
import TodoList from './TodoList';
import { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addTodoToList(e) {
    const name = todoNameRef.current.value
    if (name === ' ') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false , timestamp: new Date().toLocaleString()}]
    })
    todoNameRef.current.value = ''
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleOnKeyPress(event){
    if(event.key === 'Enter' && todoNameRef.current.value !== ""){
      addTodoToList()
    }
  }

  return (
    <div className="center">
      <div>
      <h1>This is the definitive TODO Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="stretch">
        <input className="left-curve" ref={todoNameRef} type="text" onKeyPress={handleOnKeyPress} placeholder="Type your todo and press Enter"/>
        <button onClick={addTodoToList}>Add Todo</button>
        <button className="right-curve" onClick={handleClearTodos}>Clear checked</button>
      </div>
      <br />
      <div>{todos.filter(todo => !todo.complete).length} left Todo </div>
    </div>
    </div>
  );
}

export default App;
