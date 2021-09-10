import React from 'react'
import Checkbox from "react-custom-checkbox";
import { BiCheck } from 'react-icons/bi';

export default function Todo({ todo, toggleTodo }) {
    function handleTodo() {
        toggleTodo(todo.id)
    }
    return (
        <div className="todo-item">
            <label>
            <Checkbox 
            checked={todo.complete} 
            onChange={handleTodo} 
            label= {todo.name} 
            icon={<
                    BiCheck color="#174A41" 
                    size={50} 
                />}
            borderColor="#424242"
            />
            </label>
            <div className="timestamp">{todo.timestamp}</div>
        </div>
    )
}
