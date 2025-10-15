import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import {v4 as uuidv4} from "uuid"
import { EditTodoForm } from "./editTodoForm";
import { notifyError, notifySuccess } from "../utils/notify"; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TodoWrapper = ()=>{
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null);


  const addTodo = (taskText, deadline)=>{
    setTodos([...todos, {
      id: uuidv4(),
      task: taskText,
      completed: false,
      deadline: deadline,
      overdue: false,
      notified: false
    }])
    notifySuccess(`Added Todo: ${taskText}`)
  }
  useEffect(() => {
    const interval = setInterval(()=>{
      setTodos((currentTodos)=>
        currentTodos.map((todo)=>{
        if(todo.deadline && !todo.completed && !todo.notified){
          const now = new Date();
          const deadlineTime = new Date(todo.deadline)

          if(now > deadlineTime){
            notifyError(`task overdue : ${todo.task}`)
            return {...todo,overdue:true,notified:true}
          }

        }
        return todo
        })
      )
    },2000)
    return () => clearInterval(interval)
  },[])

  const completeTodo = (id)=>{
    setTodos(
      todos.map((task)=>( task.id===id ? {...task,completed : !task.completed} : task )
    ))
    notifySuccess(`Task completed succesfully`)

  }
   const editTask = (task, deadline, id)=>{
    setTodos(
      todos.map((todo)=>
        todo.id === id ? {...todo, task, deadline,overdue:false,notified:false } : todo 
      )
    )
    notifySuccess(`Task edited succesfully`)

    setEditingId(null)
  }
  const deleteTodo = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setTodos(todos.filter((task) => task.id !== id));
            notifySuccess('Task deleted successfully');
          },
        },
        {
          label: 'No',
          onClick: () => {
          },
        },
      ],
    });
  };


  return (  
    <div className="todo-wrapper">
      <h6>Finish what you started.!</h6>
      
      <TodoForm addTodo={addTodo} />

     {todos.map((todo) => (
        editingId == todo.id ? <EditTodoForm editTodo={editTask} task={todo} key={todo.id} /> : 
          <Todo 
            todo={todo}
            key={todo.id} 
            completeTodo={completeTodo} 
            deleteTodo={deleteTodo} 
            setEditingId={setEditingId}
          />
    ))}

    </div>
  )
}

export default TodoWrapper