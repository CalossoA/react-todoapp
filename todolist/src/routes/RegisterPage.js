import React from "react";
import AuthModal from "../features/todos/AuthModal";

const RegisterPage = ({ onRegister, onClose }) => (
  <AuthModal type="register" onRegister={onRegister} onClose={onClose} />
);

export default RegisterPage;
