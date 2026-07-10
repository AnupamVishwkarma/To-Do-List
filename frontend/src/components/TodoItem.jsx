import api from "../services/api"


function TodoItem({todo, fetchTodos, setEditTodo,}){
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if(!confirmDelete) return;

        try{
            await api.delete(`/todos/${todo._id}`);
            alert("Todo delete successfully");
            await fetchTodos(); 
        }catch (error){
            console.error("Error deleting todo:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleStatusChange = async () => {
        try{
            const newStatus = todo.status === "Pending" ? "Completed" : "Pending";
            await api.patch(`/todos/${todo._id}/status`, {status : newStatus,});
            alert("Status updated successfully");
            await fetchTodos();
        }catch (error) {
            console.error("Error updating status:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return(
        <li className="list-group-item shadow-sm mb-3 rounded d-flex justify-content-between align-items-center">
            <div>
                <h5>{todo.title}</h5>
                <p className="mb-1">{todo.description}</p>

                <span className={`badge ${todo.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>{todo.status}</span>
            </div>

           <div>
             <button className={`btn ${todo.status === "Pending" ? "btn-success" : "btn-warning"} me-2`} onClick={handleStatusChange}>
                {todo.status === "Pending" ? "Mark Completed" : "Mark Pending"}
            </button>

            <button className="btn btn-primary me-2" onClick={() => setEditTodo(todo)}>Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

           </div>
           
        </li>
    );
}

export default TodoItem;