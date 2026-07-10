const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.post("/", todoController.createTodo);
router.get("/search", todoController.searchTodos);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.patch("/:id/status", todoController.updateTodoStatus);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;