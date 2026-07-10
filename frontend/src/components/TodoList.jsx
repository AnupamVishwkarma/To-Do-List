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
        try{
            const response = await api.get("/todos");
            setTodos(response.data.data);
        }catch (error){
            console.error("Error fetching todos:", error);
            alert("Something went wrong. Please try again.");
        }finally{
            setLoading(false);
        }
    };

    const searchTodos = async () => {
        try{
            if(search.trim() === ""){
                fetchTodos();
                return;
            }

            const response = await api.get(`/todos/search?title=${search}`);

            setTodos(response.data.data);
        }catch (error){
            console.error("Error searching todos:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            searchTodos();
        }, 300);

        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        fetchTodos();
    }, []);

    if(loading){
        return(
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <TodoForm fetchTodos={fetchTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo} />

            <input type="text"
            className="form-control"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />

            <h3 className="text-center pt-4">Todo List</h3>

            {todos.length === 0 ? (
                <div className="text-center mt-5">
                    <h5>No Todos Found</h5>
                    <p className="text-muted">Create your first todo.</p>
                </div>
            ) : (
                <ul className="list-group">
                    {todos.map((todo) => (
                        <TodoItem key={todo._id}
                        todo={todo}
                        fetchTodos = {fetchTodos}
                        setEditTodo = {setEditTodo}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;