import api from "../services/api";

function TodoItem({ todo, fetchTodos, setEditTodo }) {

    // Delete selected todo item
    const handleDelete = async () => {
        console.log("Delete button clicked for ID:", todo._id);

        // Showing browser confirmation dialog box
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
        
        if (!confirmDelete) {
            console.log("Delete cancelled by user");
            return;
        }

        try {
            console.log("Sending DELETE request for todo ID:", todo._id);
            const response = await api.delete(`/todos/${todo._id}`);
            
            console.log("Delete API response:", response.data);
            alert("Todo deleted successfully");

            // Refresh the main todos list
            fetchTodos(); 
        } catch (error) {
            console.log("Error inside handleDelete:", error);
            alert("Could not delete todo. Please try again.");
        }
    };

    // Toggle todo status between Pending and Completed
    const handleStatusChange = async () => {
        console.log("Current status of todo:", todo.status);

        // Determine target status
        const updatedStatus = todo.status === "Pending" ? "Completed" : "Pending";
        console.log("Updating status to:", updatedStatus);

        try {
            const response = await api.patch(`/todos/${todo._id}/status`, {
                status: updatedStatus
            });

            console.log("Status update response:", response.data);
            alert("Status updated successfully");

            // Refresh UI list
            fetchTodos();
        } catch (error) {
            console.log("Error in handleStatusChange:", error);
            alert("Could not update status. Please try again.");
        }
    };

    // Helper handler to trigger edit mode
    const handleEditClick = () => {
        console.log("Setting todo for editing:", todo);
        setEditTodo(todo);
    };

    return (
        <li className="list-group-item shadow-sm mb-3 rounded d-flex justify-content-between align-items-center">
            {/* Left section: Title, description, and status badge */}
            <div>
                <h5>{todo.title}</h5>
                <p className="mb-1 text-muted">{todo.description}</p>

                {/* Badge color changes according to status */}
                <span className={`badge ${todo.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
                    {todo.status}
                </span>
            </div>

            {/* Right section: Action buttons */}
            <div>
                {/* Toggle status button */}
                <button 
                    className={`btn ${todo.status === "Pending" ? "btn-success" : "btn-warning"} me-2`} 
                    onClick={handleStatusChange}
                >
                    {todo.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                </button>

                {/* Edit button */}
                <button 
                    className="btn btn-primary me-2" 
                    onClick={handleEditClick}
                >
                    Edit
                </button>

                {/* Delete button */}
                <button 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;