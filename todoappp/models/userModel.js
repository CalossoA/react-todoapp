const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.execute(sql, [name, email, hashedPassword]);
    return result.insertId;
  },
  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows[0];
  },
};

module.exports = User;
