import React from "react";
import AddTodo from "../features/todos/AddTodo";
import TodoList from "../features/todos/TodoList";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/todos/todosApi";

const TodosPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { data: todos = [], isLoading } = useGetTodosQuery();
  // Mostra tutti i todo se admin, altrimenti solo quelli dell'utente
  const visibleTodos = currentUser && currentUser.isAdmin
    ? todos
    : todos.filter(todo => todo.user_id === currentUser?.id);
  return (
    <div className="container py-5" style={{background: "#f8fafc", minHeight: "100vh"}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-list-check h2 me-3 text-primary"></i>
                <h1 className="fw-bold mb-0" style={{letterSpacing: "2px"}}>TODO LIST</h1>
              </div>
              <AddTodo />
              <TodoList todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
