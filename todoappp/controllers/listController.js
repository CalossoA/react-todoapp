const List = require("../models/List");

const getUserList = async (req, res) => {
  // Se admin, mostra tutte le liste
  if (req.user && req.user.email === 'admin') {
    const sql = "SELECT * FROM lists";
    const [lists] = await require('../config/db').query(sql);
    return res.json(lists);
  }
  // Altrimenti solo le proprie
  const userId = req.user.id;
  const lists = await List.findAllByUserId(userId);
  res.json(lists);
};
const getListById = async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.email === 'admin') {
    const sql = "SELECT * FROM lists WHERE id=?";
    const [list] = await require('../config/db').query(sql, [id]);
    return res.json({ data: list });
  }
  const userId = req.user.id;
  const list = await List.getListById(id, userId);
  res.json({ data: list });
};
const createList = async (req, res) => {
  const { name } = req.body;
  const userId = req.user && req.user.email === 'admin' ? 1 : req.user.id;
  // Se admin, non serve userId, ma per coerenza lo lasciamo null
  const listId = await List.create(name, userId);
  res.status(201).json({ id: listId, name, message: "List created" });
};

const updateList = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (req.user && req.user.email === 'admin') {
    const sql = "UPDATE lists SET name = ?, updated_at=NOW() WHERE id = ?";
    const [result] = await require('../config/db').execute(sql, [name, id]);
    return res.status(200).json({
      id,
      name,
      message: result.affectedRows ? "List updated" : "Error updating list",
    });
  }
  const userId = req.user.id;
  const result = await List.update({ name, userId, id });
  res.status(200).json({
    id,
    name,
    message: result ? "List updated" : "Error updating list",
  });
};

const deleteList = async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.email === 'admin') {
    const sql = "DELETE FROM lists WHERE id = ?";
    const [result] = await require('../config/db').execute(sql, [id]);
    return res.status(200).json({ message: result.affectedRows ? "List deleted" : "Error deleting list" });
  }
  const userId = req.user.id;
  const result = await List.remove(id, userId);
  res.status(200).json({ message: result ? "List deleted" : "Error deleting list" });
};

module.exports = {
  getUserList,
  getListById,
  createList,
  updateList,
  deleteList,
};
