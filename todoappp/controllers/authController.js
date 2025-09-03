const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = await User.create(name, email, password);
  const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ id: userId, name, email, token, message: "User registered" });
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Email o password non validi" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email o password non validi" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ id: user.id, name: user.name, email: user.email, token, message: "Login effettuato" });
};

module.exports = {
  register,
  login,
};
