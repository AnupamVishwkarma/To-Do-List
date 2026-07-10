const { rawListeners } = require("../models/Todo");
const todoService = require("../services/todoService");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if(!description || description.trim() === ""){
      return res.status(400).json({
        success : false,
        message : "Description is required",
      })
    }

    const todo = await todoService.createTodo({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try{
    const todo = await todoService.getTodoById(req.params.id);

    if(!todo){
      return res.status(404).json({
        success : false,
        message : "Todo not found",
      });
    }

    res.status(200).json({
      success : true,
      data : todo,
    });
  }catch (error){

    if(error.name === "CastError"){
      return res.status(400).json({
        success : false,
        message : "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;

    if(!title || title.trim() === ""){
      return res.status(400).json({
        success : false,
        message : "Title is required",
      });
    }

    if(!description || description.trim() === ""){
      return res.status(400).json({
        success : false,
        message : "Description is required",
      });
    }

    const updateTodo = await todoService.updateTodo(id, req.body);
    if(!updateTodo){
      return res.status(404).json({
        success : false,
        message : "Todo not found",
      });
    }

    res.status(200).json({
      success : true,
      message : "Todo updated successfully",
      data : updateTodo,
    });
  }catch (error){

    if(error.name === "CastError"){
      return res.status(400).json({
        success : false,
        message : "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
};

const updateTodoStatus = async (req, res) =>{
  try{
    const {id} = req.params;
    const {status} = req.body;

    if(!status){
      return res.status(400).json({
        success : false,
        message : "Status is required",
      });
    }

    if(!["Pending", "Completed"].includes(status)){
      return res.status(400).json({
        success : false,
        message : "Invalid status",
      })
    }

    const updateTodo = await todoService.updateTodoStatus(id, status);

    if(!updateTodo){
      return res.status(404).json({
        success : false,
        message : "Todo not found",
      });
    }

    res.status(200).json({
      success : true,
      message : "Todo status updated successfully",
      data : updateTodo,
    });

  }catch (error){

    if(error.name === "CastError"){
      return res.status(400).json({
        success : false,
        message : "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try{
    const {id} = req.params;

    const deleteTodo = await todoService.deleteTodo(id);

    if(!deleteTodo){
      return res.status(400).json({
        success : false,
        message : "Todo not found",
      });
    }

    res.status(200).json({
      success : true,
      message : " Todo deleted successfully",
    });
  }catch (error){

    if(error.name === "CastError"){
      return res.status(400).json({
        success : false,
        message : "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
};

const searchTodos = async (req, res) => {
  try {
    const {title} = req.query;

    if(!title) {
      return res.status(400).json({
        success : false,
        message : "Search keyword is required",
      });
    }

    const todos = await todoService.searchTodos(title);

    res.status(200).json({
      success : true,
      count : todos.length,
      data : todos,
    });
  }catch (error){
    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
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