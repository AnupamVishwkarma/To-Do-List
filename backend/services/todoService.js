const Todo = require("../models/Todo");

// Create a new todo
const createTodo = async (todoData) => {
    const todo = new Todo({
        title: todoData.title,
        description: todoData.description,
    });

    await todo.save();

    return todo;
};

// Get all todos (latest first)
const getAllTodos = async () => {
    const todos = await Todo.find().sort({ createdAt: -1 });

    return todos;
};

// Get single todo using id
const getTodoById = async (id) => {
    const todo = await Todo.findById(id);

    return todo;
};

// Update title and description
const updateTodo = async (id, todoData) => {
    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        todoData,
        {
            new: true,
            runValidators: true,
        }
    );

    return updatedTodo;
};

// Update only todo status
const updateTodoStatus = async (id, status) => {
    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true,
        }
    );

    return updatedTodo;
};

// Delete todo
const deleteTodo = async (id) => {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    return deletedTodo;
};

// Search todo by title
const searchTodos = async (keyword) => {
    const todos = await Todo.find({
        title: {
            $regex: keyword,
            $options: "i",
        },
    }).sort({ createdAt: -1 });

    return todos;
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
    searchTodos,
};