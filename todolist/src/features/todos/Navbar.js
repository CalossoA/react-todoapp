import React from "react";
import { Link } from "react-router-dom";


import { useSelector } from "react-redux";

const Navbar = ({ isLoggedIn, onLogout, onShowLogin, onShowRegister, categories, onShowLists }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg mb-4 rounded-4 border border-2 border-primary-subtle" style={{fontFamily: 'Segoe UI, Roboto, Arial, sans-serif', letterSpacing: '1px'}}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-gradient" to="/" style={{fontSize: '2rem', background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>TodoApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link fw-semibold" style={{background: 'none', border: 'none', color: '#2563eb'}} onClick={onShowLists}>
                <i className="bi bi-folder2-open me-1"></i> Visualizza liste
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" style={{color: '#2563eb'}} to="/">
                <i className="bi bi-list-check me-1"></i> Tutti i Todo
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle fw-semibold" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{background: 'none', border: 'none', color: '#2563eb'}}>
                <i className="bi bi-tags me-1"></i> Liste per argomento
              </button>
              <ul className="dropdown-menu shadow rounded-3" aria-labelledby="navbarDropdown">
                {categories.length === 0 && (
                  <li><span className="dropdown-item text-muted">Nessuna categoria</span></li>
                )}
                {categories.map(cat => (
                  <li key={cat}>
                    <Link className="dropdown-item" to={`/category/${cat}`}>{cat}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="nav-link fw-semibold" onClick={onShowLogin} style={{background: 'none', border: 'none', color: '#2563eb'}}>Login</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link fw-semibold" onClick={onShowRegister} style={{background: 'none', border: 'none', color: '#2563eb'}}>Registrati</button>
                </li>
              </>
            )}
            {isLoggedIn && currentUser && (
              <>
                <li className="nav-item d-flex align-items-center me-2">
                  <span className="nav-link fw-bold text-primary d-flex align-items-center" style={{fontSize: '1.1rem'}}>
                    <i className="bi bi-person-circle me-1" style={{fontSize: '1.5rem', color: currentUser.isAdmin ? '#eab308' : '#2563eb'}}></i>
                    {currentUser.name || currentUser.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-danger fw-semibold" onClick={onLogout} style={{background: 'none', border: 'none', fontSize: '1.1rem'}}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
