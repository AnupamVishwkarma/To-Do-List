const todoService = require("../services/todoService");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description both are required"
      });
    }

    const todo = await todoService.createTodo({ title, description });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.log("Error in createTodo:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    console.log("Fetch all error:", err);
    res.status(500).json({ success: false, message: "Could not fetch todos" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Invalid ID or server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await todoService.updateTodo(id, req.body);

    if (!updatedTodo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, data: updatedTodo });
  } catch (err) {
    console.log("Update error:", err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status missing" });
    }

    const updated = await todoService.updateTodoStatus(id, status);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Status update failed" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleted = await todoService.deleteTodo(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Already deleted or not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

const searchTodos = async (req, res) => {
  try {
    const query = req.query.title;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query string required" });
    }

    const todos = await todoService.searchTodos(query);
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Search failed" });
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