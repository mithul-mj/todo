import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({todo,completeTodo,deleteTodo,setEditingId})=>{

const formattedDate = todo.deadline 
  ? new Date(todo.deadline).toLocaleString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }) 
  : "";



  return (
  <div className="todo">
    <div style={{ flexGrow: 1 }}>
      <p
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginBottom: 0,
          color:
            !todo.completed && todo.deadline && new Date(todo.deadline) < new Date()
              ? "red" 
              : "white"
        }}
      >
        {todo.task}
      </p>

      {formattedDate && (
        <p
          style={{
            fontSize: "0.8rem",
            color:
              !todo.completed && todo.deadline && new Date(todo.deadline) < new Date()
                ? "red"
                : "#eee",
            marginBottom: 0
          }}
        >
          {formattedDate}
        </p>
      )}
    </div>

    <div>
      {!todo.completed && (
        <>
          <FontAwesomeIcon icon={faSquareCheck} onClick={() => completeTodo(todo.id)} />
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEditingId(todo.id)} />
        </>
      )}
    </div>
  </div>
);

}