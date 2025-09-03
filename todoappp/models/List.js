const db = require("../config/db");
const User = {
  create: async (name, userId) => {
    let sql, params;
    if (userId == null) {
      sql = "INSERT INTO lists (name, created_at) VALUES (?, NOW())";
      params = [name];
    } else {
      sql = "INSERT INTO lists (name, user_id, created_at) VALUES (?, ?, NOW())";
      params = [name, userId];
    }
    const [result] = await db.execute(sql, params);
    return result.insertId;
  },
  remove: async (id, userId) => {
    const sql = "DELETE FROM lists WHERE id = ? AND user_id = ?";
    const [result] = await db.execute(sql, [id, userId]);
    return result.affectedRows;
  },
  update: async ({name, id, userId}) => {
    const sql = "UPDATE lists SET name = ?, updated_at=NOW() WHERE id = ? AND user_id = ?";
    const [result] = await db.execute(sql, [name, id, userId]);
    return result.affectedRows;
  },
  findAllByUserId: async (userId) => {
    const sql = "SELECT * FROM lists WHERE user_id IS NULL OR user_id = ?";
    const [rows] = await db.query(sql, [userId]);
    return rows;
  },
  getListById: async (id, userId) => {
    const sql = "SELECT * FROM lists WHERE id=? AND user_id = ?";
    const [rows] = await db.query(sql, [id, userId]);
    return rows;
  },
};
module.exports = User;
