import { useState, useEffect } from "react";
// Axios instance for api requests
import api from "../services/api";

function TodoForm({ fetchTodos, editTodo, setEditTodo }) {
    // States to handle input fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Effect to auto-fill form inputs when edit button is clicked in parent
    useEffect(() => {
        console.log("Edit todo prop changed:", editTodo);

        if (editTodo) {
            setTitle(editTodo.title);
            // Setting description or empty string if null
            setDescription(editTodo.description || "");
        } else {
            // Reset fields if editTodo is null
            setTitle("");
            setDescription("");
        }
    }, [editTodo]);

    // Handler for form submit button
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted with title:", title, "and description:", description);

        // Client side validation checks
        if (!title || title.trim() === "") {
            alert("Title is required");
            return;
        }

        if (!description || description.trim() === "") {
            alert("Description is required");
            return;
        }

        try {
            // If editTodo exists then perform update (PUT)
            if (editTodo) {
                console.log("Sending PUT request for ID:", editTodo._id);

                const response = await api.put(`/todos/${editTodo._id}`, {
                    title: title,
                    description: description,
                    status: editTodo.status
                });

                console.log("Update response received:", response.data);
                alert("Todo Updated Successfully");

                // Clear edit mode in parent
                setEditTodo(null);
            } else {
                // Else create new todo item (POST)
                console.log("Sending POST request to create todo...");

                const response = await api.post("/todos", {
                    title: title,
                    description: description
                });

                console.log("Create response received:", response.data);
                alert("Todo Added Successfully");
            }

            // Clear input fields after success
            setTitle("");
            setDescription("");

            // Refresh list in main page
            fetchTodos();

        } catch (error) {
            console.log("API Error in TodoForm:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    // Reset button handler to clear form manually
    const handleCancel = () => {
        console.log("Cancelling edit mode");
        setEditTodo(null);
        setTitle("");
        setDescription("");
    };

    return (
        <div className="card p-3 mb-4">
            {/* Dynamic Title based on whether editing or adding */}
            <h4 className="text-center">
                {editTodo ? "Edit Todo Task" : "Add New Todo"}
            </h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Task Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter description..."
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editTodo ? "Update Todo" : "Add Todo"}
                    </button>

                    {/* Show cancel button only when in edit mode */}
                    {editTodo && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default TodoForm;