import api from "../services/api";

function TodoItem({ todo, fetchTodos, setEditTodo }) {

  const handleDelete = async () => {
    if (window.confirm("Delete this item?")) {
      try {
        await api.delete(`/todos/${todo._id}`);
        fetchTodos();
      } catch (err) {
        console.log("Delete error:", err);
      }
    }
  };

  const handleStatusChange = async () => {
    const newStatus = todo.status === "Pending" ? "Completed" : "Pending";
    try {
      await api.patch(`/todos/${todo._id}/status`, { status: newStatus });
      fetchTodos();
    } catch (err) {
      console.log("Status change failed:", err);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
      <div>
        <h5 style={{ textDecoration: todo.status === "Completed" ? "line-through" : "none" }}>
          {todo.title}
        </h5>
        <p className="mb-1 text-muted">{todo.description}</p>
        <span className={`badge ${todo.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
          {todo.status}
        </span>
      </div>

      <div>
        <button 
          className="btn btn-sm btn-outline-success me-2" 
          onClick={handleStatusChange}
        >
          {todo.status === "Pending" ? "Done" : "Undo"}
        </button>

        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          onClick={() => setEditTodo(todo)}
        >
          Edit
        </button>

        <button 
          className="btn btn-sm btn-outline-danger" 
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;