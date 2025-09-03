const db = require("../config/db");
const Todo = {
  create: async ({title, description, listId, userId}) => {
    const sql = "INSERT INTO todos (name, list_id, user_id, created_at) VALUES (?, ?, ?, NOW())";
    const [result] = await db.execute(sql, [title, listId, userId]);
    return result.insertId;
  },
  remove: async (id) => {
    const sql = "DELETE FROM todos WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  },
  update: async ({title, completed, id}) => {
    let sql = "UPDATE todos SET updated_at=NOW()";
    const params = [];
    if (title !== undefined) {
      sql += ", name = ?";
      params.push(title);
    }
    if (completed !== undefined) {
      sql += ", completed = ?";
      params.push(completed);
    }
    sql += " WHERE id = ?";
    params.push(id);
    const [result] = await db.execute(sql, params);
    return result.affectedRows;
  },
  findAllByUserId: async (userId) => {
    const sql = "SELECT * FROM todos WHERE user_id = ?";
    const [rows] = await db.query(sql, [userId]);
    return rows;
  },
  getTodoById: async (id) => {
    const sql = "SELECT * FROM todos WHERE id=?";
    const [rows] = await db.query(sql, [id]);
    return rows;
  },
};
module.exports = Todo;
