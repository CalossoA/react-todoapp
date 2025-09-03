const Todo = require("../models/Todo");

const getUserTodos = async (req, res) => {
  console.log('GET TODOS - USER:', req.user);
  if (req.user && req.user.email === 'admin') {
    // Admin: mostra tutti i todo
    const sql = "SELECT * FROM todos";
    const [todos] = await require('../config/db').query(sql);
    return res.json(todos);
  }
  // Utente normale: solo i propri todo
  const userId = req.user.id;
  const todos = await Todo.findAllByUserId(userId);
  res.json(todos);
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.getTodoById(id);
  res.json({ data: todo });
};

const createTodo = async (req, res) => {
  console.log('CREATE TODO - BODY:', req.body);
  console.log('CREATE TODO - USER:', req.user);
  const { title, listId } = req.body;
  const userId = req.user.id;
  const todoId = await Todo.create({ title, listId, userId });
  res.status(201).json({ id: todoId, title, listId, userId, message: "Todo created" });
};

const updateTodo = async (req, res) => {
  const { title, completed } = req.body;
  const { id } = req.params;
  // Se admin, può modificare qualsiasi todo
  if (req.user && req.user.email === 'admin') {
    const result = await Todo.update({ title, completed, id });
    return res.status(200).json({ id, title, completed, message: result ? "Todo updated" : "Error updating todo" });
  }
  // Utente normale: può modificare solo i propri todo
  // (opzionale: aggiungi controllo su user_id)
  const result = await Todo.update({ title, completed, id });
  res.status(200).json({ id, title, completed, message: result ? "Todo updated" : "Error updating todo" });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  // Se admin, può cancellare qualsiasi todo
  if (req.user && req.user.email === 'admin') {
    const result = await Todo.remove(id);
    return res.status(200).json({ message: result ? "Todo deleted" : "Error deleting todo" });
  }
  // Utente normale: può cancellare solo i propri todo
  // (opzionale: aggiungi controllo su user_id)
  const result = await Todo.remove(id);
  res.status(200).json({ message: result ? "Todo deleted" : "Error deleting todo" });
};

module.exports = {
  getUserTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
