const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Todo API Running");
});

module.exports = app;