import { useState } from "react";
import { notifyError } from "../utils/notify";

export const TodoForm = ({addTodo})=>{
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e){
    e.preventDefault(); 
    if(!value.trim() || !deadline){
      notifyError(`task and deadline can't be empty`)
      return;
    } 
    addTodo(value,deadline)
    setValue('')
    setDeadline('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} >
      <input type="text" 
      className="todo-input"
      placeholder="enter the task."
      value={value} 
      onChange={(e)=>setValue(e.target.value)}
      />
      <input 
        type="datetime-local"
        className="todo-input"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit" className="todo-btn">Add Task</button>
    </form>
  )
}