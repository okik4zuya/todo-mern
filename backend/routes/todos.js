const express = require("express");
const todo = require("../models/todo");
const router = express.Router();
const Todo = require("../models/todo");

// Getting all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one
router.get("/:id", getTodo, (req, res) => {
  res.send(res.todo);
});

// Creating one
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
    createdAt: req.body.createdAt,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updating one
router.patch("/:id", getTodo, async (req, res) => {
  res.todo.title = req.body.title;
  res.todo.description = req.body.description;
  res.todo.done = req.body.done;

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

// Deleting one
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: "Todo removed" });
  } catch {
    res.status(500).json({ message: error.message });
  }
});

async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.todo = todo;
  next();
}

module.exports = router;
