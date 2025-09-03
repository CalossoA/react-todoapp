import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AuthModal = ({ type, onLogin, onRegister, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, currentUser } = useSelector(state => state.auth);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && !loading && !error && currentUser) {
      setUsername("");
      setPassword("");
      onClose();
    }
  }, [submitted, loading, error, currentUser, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (type === "login") {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.2)"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{type === "login" ? "Login" : "Registrati"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              {loading && <div className="text-info">Caricamento...</div>}
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" disabled={loading}>{type === "login" ? "Login" : "Registrati"}</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Annulla</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
