const Todo = require("../models/Todo");

const createTodo = async (todoData) => {
  return await Todo.create(todoData);
};

const getAllTodos = async () => {
    return await Todo.find();
};

const getTodoById = async (id) => {
  return await Todo.findById(id);
};

const updateTodo = async (id, todoData) => {
  return await Todo.findByIdAndUpdate(id, todoData,{
    new : true,
    runValidators : true,
  });
};

const updateTodoStatus = async (id, status) => {
  return await Todo.findByIdAndUpdate(id, {status},{
    new : true,
    runValidators : true,
  });
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

const searchTodos = async (keyword) => {
  return await Todo.find({
    title : {
      $regex : keyword,
      $options : "i",
    },
  }).sort({createdAt : -1});
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