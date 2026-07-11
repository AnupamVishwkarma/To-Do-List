const Todo = require("../models/Todo");

const createTodo = async (todoData) => {
  const newTodo = new Todo({
    title: todoData.title,
    description: todoData.description,
    status: "Pending"
  });

  return await newTodo.save();
};

const getAllTodos = async () => {
  return await Todo.find().sort({ createdAt: -1 });
};

const getTodoById = async (id) => {
  const todo = await Todo.findById(id);
  return todo;
};

const updateTodo = async (id, todoData) => {
  const updated = await Todo.findByIdAndUpdate(
    id,
    {
      title: todoData.title,
      description: todoData.description
    },
    { new: true }
  );
  return updated;
};

const updateTodoStatus = async (id, status) => {
  return await Todo.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

const searchTodos = async (keyword) => {
  const results = await Todo.find({
    title: { $regex: keyword, $options: "i" }
  });
  return results;
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