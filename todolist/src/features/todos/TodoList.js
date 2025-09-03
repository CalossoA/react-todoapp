
import React, { useState } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation, useToggleTodoMutation } from "./todosApi";

const TodoList = ({ todos }) => {
  const [editingTodo, setEditingTodo] = useState("");
  const [editedName, setEditedName] = useState("");
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  return (
    <div className="mt-4 animate__animated animate__fadeIn">
      <div className="mb-3">
        <h4 className="fw-bold text-gradient" style={{fontSize: '1.4rem', background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Da completare</h4>
        <ul className="list-group mb-4 shadow-lg rounded-4 border border-2 border-primary-subtle">
          {activeTodos.length === 0 && (
            <li className="list-group-item text-muted text-center">Nessun task da completare</li>
          )}
          {activeTodos.map(todo => (
            <li className="list-group-item d-flex align-items-center justify-content-between bg-white animate__animated animate__fadeInUp" key={todo.id} style={{borderRadius: '0.75rem', marginBottom: '0.5rem', boxShadow: '0 2px 12px rgba(56,189,248,0.08)'}}>
              <span className="fw-semibold">
                {editingTodo === todo.id ? (
                  <form onSubmit={async e => {
                    e.preventDefault();
                    if(editedName.trim()) {
                      await updateTodo({ id: todo.id, title: editedName });
                      setEditingTodo("");
                    }
                  }} className="d-inline">
                    <input className="form-control form-control-sm d-inline w-auto border-2 border-primary-subtle" style={{borderRadius: '0.75rem'}} value={editedName} onChange={e => setEditedName(e.target.value)} />
                    <button className="btn btn-sm btn-success ms-2" type="submit">Salva</button>
                    <button className="btn btn-sm btn-secondary ms-1" type="button" onClick={() => setEditingTodo("")}>Annulla</button>
                  </form>
                ) : (
                  <>
                    {todo.name}
                    <button className="btn btn-sm btn-outline-warning ms-2" title="Modifica" onClick={() => {setEditingTodo(todo.id); setEditedName(todo.name);}}>
                      <i className="bi bi-pencil"></i>
                    </button>
                  </>
                )}
              </span>
              <div>
                <button className="btn btn-sm btn-gradient me-2" title="Completa" style={{background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', color: '#fff', border: 'none', borderRadius: '50px'}} onClick={async () => await toggleTodo({ id: todo.id, completed: true })}>
                  <i className="bi bi-circle"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger" title="Elimina" style={{borderRadius: '50px'}} onClick={async () => await deleteTodo(todo.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="fw-bold text-secondary" style={{fontSize: '1.4rem'}}>Completati</h4>
        <ul className="list-group shadow-lg rounded-4 border border-2 border-primary-subtle">
          {completedTodos.length === 0 && (
            <li className="list-group-item text-muted text-center">Nessun task completato</li>
          )}
          {completedTodos.map(todo => (
            <li className="list-group-item d-flex align-items-center justify-content-between bg-light animate__animated animate__fadeInUp" key={todo.id} style={{borderRadius: '0.75rem', marginBottom: '0.5rem', boxShadow: '0 2px 12px rgba(56,189,248,0.08)'}}>
              <span className="text-decoration-line-through text-secondary">
                {editingTodo === todo.id ? (
                  <form onSubmit={async e => {
                    e.preventDefault();
                    if(editedName.trim()) {
                      await updateTodo({ id: todo.id, title: editedName });
                      setEditingTodo("");
                    }
                  }} className="d-inline">
                    <input className="form-control form-control-sm d-inline w-auto border-2 border-primary-subtle" style={{borderRadius: '0.75rem'}} value={editedName} onChange={e => setEditedName(e.target.value)} />
                    <button className="btn btn-sm btn-success ms-2" type="submit">Salva</button>
                    <button className="btn btn-sm btn-secondary ms-1" type="button" onClick={() => setEditingTodo("")}>Annulla</button>
                  </form>
                ) : (
                  <>
                    {todo.name}
                    <button className="btn btn-sm btn-outline-warning ms-2" title="Modifica" onClick={() => {setEditingTodo(todo.id); setEditedName(todo.name);}}>
                      <i className="bi bi-pencil"></i>
                    </button>
                  </>
                )}
              </span>
              <div>
                <button className="btn btn-sm btn-gradient me-2" title="Segna come da completare" style={{background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', color: '#fff', border: 'none', borderRadius: '50px'}} onClick={async () => await toggleTodo({ id: todo.id, completed: false })}>
                  <i className="bi bi-check-circle-fill"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger" title="Elimina" style={{borderRadius: '50px'}} onClick={async () => await deleteTodo(todo.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
