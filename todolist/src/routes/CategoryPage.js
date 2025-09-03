import React from "react";
import AddTodo from "../features/todos/AddTodo";
import TodoList from "../features/todos/TodoList";
import useRemoveTodo from "../features/todos/useRemoveTodo";
import useToggleTodo from "../features/todos/useToggleTodo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const todos = useSelector((state) => state.todos.todos);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const removeTodo = useRemoveTodo();
  const toggleTodo = useToggleTodo();
  // Mostra tutti i todo della categoria se admin, altrimenti solo quelli dell'utente
  const filtered = currentUser && currentUser.isAdmin
    ? todos.filter(todo => todo.category === category)
    : todos.filter(todo => todo.category === category && todo.userId === currentUser?.id);
  return (
    <div className="container py-5" style={{background: "#f8fafc", minHeight: "100vh"}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-list-check h2 me-3 text-primary"></i>
                <h1 className="fw-bold mb-0" style={{letterSpacing: "2px"}}>Argomento: {category}</h1>
              </div>
              <AddTodo />
              <TodoList todos={filtered} onToggle={toggleTodo} onRemove={removeTodo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
