import { useState, useEffect } from "react";
import api from "../services/api";

function TodoForm({fetchTodos, editTodo, setEditTodo}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(editTodo){
            setTitle(editTodo.title);
            setDescription(editTodo.description);
        }
    }, [editTodo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(title.trim() === ""){
            alert("Title is required");
            return;
        }

        if(description.trim() === ""){
            alert("Description is required");
            return;
        }

        try{
            if(editTodo){
                await api.put(`/todos/${editTodo._id}`, {
                    title,
                    description,
                    status : editTodo.status,
                });

                alert("Todo Updated Successfully");

                setEditTodo(null);
            }else {
                await api.post("/todos", {
                    title,
                    description,
                });

                alert("Todo Added Successfully");
            }

            setTitle("");
            setDescription("");
            fetchTodos();
        }catch (error) {
            console.error("Error creating todo:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="card p-3 mb-4">
            <h4 className="text-center">Add Todo</h4>

            <form action="" onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-3" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea name="" id="" className="form-control mb-3" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        {editTodo ? "Update Todo" : "Add Todo"}
                    </button>

                    {editTodo && (
                        <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditTodo(null);
                            setTitle("");
                            setDescription("");
                        }}
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