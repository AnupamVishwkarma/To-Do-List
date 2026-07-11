// Import service layer to handle DB operations
const todoService = require("../services/todoService");

// 1. Controller to handle new Todo creation
const createTodo = async (req, res) => {
  try {
    // Debugging input coming from frontend form
    console.log("Creating todo with body:", req.body);

    const title = req.body.title;
    const description = req.body.description;

    // Basic check to see if required fields are present
    if (!title || title.trim() === "") {
      console.log("Validation failed: Title is missing");
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description || description.trim() === "") {
      console.log("Validation failed: Description is missing");
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    // Call service to save data
    const newTodo = await todoService.createTodo({
      title: title,
      description: description,
    });

    console.log("Todo successfully created:", newTodo._id);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    console.log("Error inside createTodo controller:", err);
    res.status(500).json({
      success: false,
      message: "Server error: could not create todo",
    });
  }
};

// 2. Controller to fetch all todos
const getAllTodos = async (req, res) => {
  try {
    console.log("Fetching all todos from DB...");
    const todos = await todoService.getAllTodos();

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    console.log("Error fetching todos list:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get todos list",
    });
  }
};

// 3. Get single todo using URL parameter ID
const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    console.log("Looking up todo ID:", todoId);

    const todo = await todoService.getTodoById(todoId);

    // Check if Mongo returned null
    if (!todo) {
      console.log("No todo found with given ID");
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (err) {
    console.log("Error finding single todo:", err.message);
    
    // Handling invalid Mongo ID format manually
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error fetching todo",
    });
  }
};

// 4. Update title and description
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    console.log("Updating todo ID:", id, "with data:", req.body);

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const updatedTodo = await todoService.updateTodo(id, req.body);

    if (!updatedTodo) {
      console.log("Todo to update was not found");
      return res.status(404).json({
        success: false,
        message: "Todo not found to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    console.log("Error updating todo:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Could not update todo",
    });
  }
};

// 5. Controller for status update (e.g., Pending -> Completed)
const updateTodoStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    console.log("Changing status for ID:", id, "to:", status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Checking valid status options
    const allowedStatuses = ["Pending", "Completed"];
    if (!allowedStatuses.includes(status)) {
      console.log("Invalid status value passed:", status);
      return res.status(400).json({
        success: false,
        message: "Status must be either Pending or Completed",
      });
    }

    const updatedTodo = await todoService.updateTodoStatus(id, status);

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    console.log("Error updating todo status:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to update status",
    });
  }
};

// 6. Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting todo with ID:", id);

    const deletedTodo = await todoService.deleteTodo(id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleteTodo controller:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
    });
  }
};

// 7. Search controller using URL query ?title=keyword
const searchTodos = async (req, res) => {
  try {
    const searchTitle = req.query.title;
    console.log("Search query received:", searchTitle);

    if (!searchTitle) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const todos = await todoService.searchTodos(searchTitle);

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    console.log("Error searching todos:", err);
    res.status(500).json({
      success: false,
      message: "Search failed on server",
    });
  }
};

// Export all controller functions
module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  searchTodos,
};