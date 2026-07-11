import { useState, useEffect } from "react";
import api from "../services/api";

function TodoForm({ fetchTodos, editTodo, setEditTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description || "");
    }
  }, [editTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill both title and description");
      return;
    }

    try {
      if (editTodo) {
        await api.put(`/todos/${editTodo._id}`, {
          title,
          description,
          status: editTodo.status
        });
        setEditTodo(null);
      } else {
        await api.post("/todos", { title, description });
      }

      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (err) {
      console.log("Error in submit:", err);
      alert("Failed to save todo");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-center">{editTodo ? "Edit Task" : "Add New Task"}</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Description"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          {editTodo ? "Update" : "Add Task"}
        </button>

        {editTodo && (
          <button
            type="button"
            className="btn btn-secondary btn-sm ms-2"
            onClick={() => {
              setEditTodo(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TodoForm;