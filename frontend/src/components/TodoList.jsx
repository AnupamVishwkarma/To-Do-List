import { useEffect, useState } from "react";
import api from "../services/api";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
    // Main state for holding todos array
    const [todos, setTodos] = useState([]);
    
    // State to pass selected todo item to TodoForm for editing
    const [editTodo, setEditTodo] = useState(null);
    
    // Loading indicator state
    const [loading, setLoading] = useState(true);
    
    // Search input state
    const [search, setSearch] = useState("");

    // Function to fetch all todos from backend API
    const fetchTodos = async () => {
        console.log("Fetching todos list from API...");
        setLoading(true);
        
        try {
            const response = await api.get("/todos");
            console.log("Data fetched successfully:", response.data);
            
            // Extracting array from API wrapper response
            setTodos(response.data.data);
        } catch (error) {
            console.log("Error in fetchTodos:", error);
            alert("Could not load todos. Please check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle title search
    const handleSearch = async (searchTerm) => {
        console.log("Searching with keyword:", searchTerm);
        
        // If search input is empty, reset and fetch all todos
        if (!searchTerm || searchTerm.trim() === "") {
            fetchTodos();
            return;
        }

        try {
            const response = await api.get(`/todos/search?title=${searchTerm}`);
            console.log("Search API results:", response.data);

            setTodos(response.data.data);
        } catch (error) {
            console.log("Error during search:", error);
            alert("Failed to perform search. Please try again.");
        }
    };

    // Effect hook to trigger search whenever search query changes
    useEffect(() => {
        // Debounce timer to prevent sending API request on every keystroke
        const timer = setTimeout(() => {
            if (search.trim() !== "") {
                handleSearch(search);
            } else {
                fetchTodos();
            }
        }, 400);

        // Cleanup function for timer
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    // Render loading spinner when fetching initial data
    if (loading && todos.length === 0) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            {/* Form component for create / update operations */}
            <TodoForm 
                fetchTodos={fetchTodos}
                editTodo={editTodo}
                setEditTodo={setEditTodo} 
            />

            {/* Search Input Bar */}
            <div className="mb-3">
                <label className="form-label">Search Tasks:</label>
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by title keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>

            <h3 className="text-center pt-2 pb-2">Todo List</h3>

            {/* Conditional rendering for empty array */}
            {todos.length === 0 ? (
                <div className="text-center mt-4 p-4 border rounded bg-light">
                    <h5>No Todos Found</h5>
                    <p className="text-muted mb-0">Create your first task using the form above.</p>
                </div>
            ) : (
                <ul className="list-group">
                    {todos.map((todo) => (
                        <TodoItem 
                            key={todo._id}
                            todo={todo}
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