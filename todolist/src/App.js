import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Navbar from './features/todos/Navbar';
import AuthModal from './features/todos/AuthModal';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser } from './features/auth/authSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodosPage from './routes/TodosPage';
import CategoryPage from './routes/CategoryPage';
import ListsPage from './routes/ListsPage';

function App() {
  const [showLists, setShowLists] = React.useState(false);
  const todosState = useSelector((state) => state.todos);
  const todos = todosState.todos; // Keeping this line for context
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  // Stato per autenticazione e filtro argomento
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  // Categorie dinamiche
  // const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean))); // Removed as per patch

  // Filtra i todo per categoria se selezionata
  // const filteredTodos = selectedCategory ? todos.filter(todo => todo.category === selectedCategory) : todos; // Removed as per patch

  // Funzione per ottenere le categorie dinamiche
  const getCategories = () => [];

  // Funzioni di navigazione
  const handleLogout = () => { dispatch(logoutUser()); };
  const handleShowLogin = () => { setShowLogin(true); setShowRegister(false); };
  const handleShowRegister = () => { setShowRegister(true); setShowLogin(false); };
  // ...existing code...
  const handleShowLists = () => {}; // placeholder

  // Logica di autenticazione con chiamate API
  const handleLogin = (username, password) => {
    dispatch(loginUser({ email: username, password }));
    setShowLogin(false);
  };
  const handleRegister = (username, password) => {
    dispatch(registerUser({ name: username, email: username, password }));
    setShowRegister(false);
  };
  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={!!currentUser}
        onLogout={handleLogout}
        onShowLogin={handleShowLogin}
        onShowRegister={handleShowRegister}
        categories={getCategories()}
        onShowLists={() => setShowLists(true)}
      />
      {showLogin && (
        <AuthModal type="login" onLogin={handleLogin} onClose={handleCloseModal} />
      )}
      {showRegister && (
        <AuthModal type="register" onRegister={handleRegister} onClose={handleCloseModal} />
      )}
      {showLists ? (
        <ListsPage onBack={() => setShowLists(false)} onGoToTodos={() => setShowLists(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<TodosPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
