// importing the mongoose model
const Todo = require("../models/Todo");

// function to create a todo
const createTodo = async (todoData) => {
    try {
        // validating manually if title exists
        if (!todoData.title) {
            console.log("Title is missing in service!");
            throw new Error("Title is required");
        }

        // creating new instance
        const newTodo = new Todo({
            title: todoData.title,
            description: todoData.description,
            status: todoData.status || "Pending" // default status if user doesnt pass
        });

        // saving to db
        const savedTodo = await newTodo.save();
        console.log("Saved todo in DB:", savedTodo._id);
        
        return savedTodo;
    } catch (err) {
        console.log("Error in createTodo service:", err.message);
        throw err; // passing error back to controller
    }
};

// get all todos list
const getAllTodos = async () => {
    try {
        // fetching all data and sorting by latest
        const todos = await Todo.find().sort({ createdAt: -1 });
        console.log("Total todos fetched:", todos.length);
        return todos;
    } catch (err) {
        console.log("Failed to fetch todos from DB:", err);
        throw err;
    }
};

// get single todo by mongo id
const getTodoById = async (id) => {
    try {
        const todo = await Todo.findById(id);
        
        // checking if ID actually returned a document
        if (!todo) {
            console.log("No todo found with id:", id);
            return null;
        }
        
        return todo;
    } catch (err) {
        console.log("Error finding todo by id:", err);
        throw err;
    }
};

// update todo details
const updateTodo = async (id, todoData) => {
    try {
        // update and get back new updated document
        const updated = await Todo.findByIdAndUpdate(
            id,
            {
                title: todoData.title,
                description: todoData.description
            },
            { new: true }
        );

        return updated;
    } catch (err) {
        console.log("Update failed:", err);
        throw err;
    }
};

// update status only
const updateTodoStatus = async (id, status) => {
    try {
        // checking status string
        const updated = await Todo.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );
        return updated;
    } catch (err) {
        console.log("Status update error:", err);
        throw err;
    }
};

// delete todo
const deleteTodo = async (id) => {
    try {
        const deleted = await Todo.findByIdAndDelete(id);
        console.log("Deleted item:", id);
        return deleted;
    } catch (err) {
        console.log("Delete error in service:", err);
        throw err;
    }
};

// search function by title keyword
const searchTodos = async (keyword) => {
    try {
        // regex search for searchbar
        const query = {
            title: { $regex: keyword, $options: "i" }
        };
        const searchResults = await Todo.find(query);
        return searchResults;
    } catch (err) {
        console.log("Search error:", err);
        throw err;
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
    searchTodos
};