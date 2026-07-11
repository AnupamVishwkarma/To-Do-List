import { useEffect, useState } from "react";
import api from "../services/api";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data.data);
    } catch (err) {
      console.log("Error loading todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Simple direct search call when search text changes
  const handleSearch = async (text) => {
    setSearch(text);
    if (text.trim() === "") {
      fetchTodos();
      return;
    }

    try {
      const res = await api.get(`/todos/search?title=${text}`);
      setTodos(res.data.data);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading tasks...</p>;
  }

  return (
    <div className="mt-3">
      <TodoForm 
        fetchTodos={fetchTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo} 
      />

      <div className="mb-3">
        <input 
          type="text"
          className="form-control"
          placeholder="Type title to search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)} 
        />
      </div>

      <h4>Your Tasks ({todos.length})</h4>

      {todos.length === 0 ? (
        <p className="text-muted">No todos found.</p>
      ) : (
        <ul className="list-group">
          {todos.map((item) => (
            <TodoItem 
              key={item._id}
              todo={item}
              fetchTodos={fetchTodos}
              setEditTodo={setEditTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;