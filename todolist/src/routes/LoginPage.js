import React from "react";
import AuthModal from "../features/todos/AuthModal";

const LoginPage = ({ onLogin, onClose }) => (
  <AuthModal type="login" onLogin={onLogin} onClose={onClose} />
);

export default LoginPage;
