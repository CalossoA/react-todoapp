
// import express from 'express';

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const authRoutes = require("./routes/authRoutes");
app.use('/api/auth', authRoutes);


const authMiddleware = require("./middleware/authMiddleware");

const listRoutes = require("./routes/listRoutes");
app.use('/api/lists', authMiddleware, listRoutes);

const todoRoutes = require("./routes/todoRoutes");
app.use('/api/todos', authMiddleware, todoRoutes);

// const pool = require("./config/db");
// // app.get("/test-db", async (req, res) => {
// //   try {
// //     const [rows] = await pool.query("SELECT 1 + 1 AS RESULT");
// //     res.json({
// //       result: rows[0].RESULT,
// //       message: "Connessione al database riuscita e query eseguita!"
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Database query failed" });
// //   }
// // });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
