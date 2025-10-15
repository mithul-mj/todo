import { useState } from "react";

export const EditTodoForm = ({editTodo,task})=>{

  const [value, setValue] = useState(task.task);
  const [editDeadline, setEditDeadline] = useState(task.deadline || "");


  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!value.trim()) return;
    editTodo(value.trim(),editDeadline,task.id)
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form edit-form">
        <input 
          type="text"  
          value={value}
          className="todo-input"
          onChange={(e)=>setValue(e.target.value)} 
        />
        <input 
          type="datetime-local"
          className="todo-input"
          value={task.deadline}
          onChange={(e) => setEditDeadline(e.target.value)}
        />
        <button className="update-btn" type="submit">Update</button>
    </form>
  )
}