import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} from "../features/lists/listsApi";

const ListsPage = ({ onBack, onGoToTodos }) => {
  const [editingList, setEditingList] = useState("");
  const [editedName, setEditedName] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const navigate = useNavigate();
  const [newList, setNewList] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {
    data: lists = [],
    isLoading,
    refetch,
  } = useGetListsQuery();
  const [addList] = useAddListMutation();
  const [updateList] = useUpdateListMutation();
  const [deleteList] = useDeleteListMutation();

  const getListData = (cat) => {
    const items = todos.filter(todo => todo.category === cat.name && !todo.isPlaceholder);
    const allItems = todos.filter(todo => todo.category === cat.name);
    return {
      name: cat.name,
      userId: cat.userId,
      count: items.length,
      hasTodos: items.length > 0
    };
  };
  
  // Mostra tutte le liste se admin, altrimenti solo quelle dell'utente
  const userLists = currentUser && currentUser.isAdmin
    ? lists
    : lists.filter(cat => cat.user_id === currentUser?.id);

  return (
    <div className="container py-5" style={{background: "#f8fafc", minHeight: "100vh"}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-folder2-open h2 me-3 text-primary"></i>
                <h1 className="fw-bold mb-0" style={{letterSpacing: "2px"}}>LISTE ARGOMENTI</h1>
              </div>
              <button className="btn btn-outline-primary mb-4" onClick={onBack}>
                <i className="bi bi-arrow-left"></i> Torna ai Todo
              </button>
              <form className="row g-2 mb-4" onSubmit={async e => {
                e.preventDefault();
                if(newList.trim()) {
                  await addList({ name: newList.trim() });
                  setNewList("");
                }
              }}>
                <div className="col-md-8">
                  <input className="form-control" placeholder="Nuova lista (argomento)" value={newList} onChange={e => setNewList(e.target.value)} />
                </div>
                <div className="col-md-4 d-grid">
                  <button className="btn btn-success" type="submit">Aggiungi lista</button>
                </div>
              </form>
              <table className="table table-bordered table-striped">
                <thead className="table-light">
                  <tr>
                    <th>Nome lista</th>
                    <th>ID Utente</th>
                    <th>Numero Todo</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={4} className="text-center text-muted">Caricamento...</td></tr>
                  ) : userLists.length === 0 ? (
                    <tr><td colSpan={4} className="text-center text-muted">Nessuna lista presente</td></tr>
                  ) : userLists.map(cat => {
                    const data = getListData(cat);
                    return (
                      <tr key={cat.id || cat.name}>
                        <td>
                          {editingList === cat.name ? (
                            <form onSubmit={async e => {
                              e.preventDefault();
                              if (editedName.trim() && editedName !== cat.name) {
                                await updateList({ id: cat.id, name: editedName });
                                refetch();
                              }
                              setEditingList("");
                            }}>
                              <input className="form-control form-control-sm d-inline w-auto" value={editedName} onChange={e => setEditedName(e.target.value)} />
                              <button className="btn btn-sm btn-success ms-2" type="submit">Salva</button>
                              <button className="btn btn-sm btn-secondary ms-1" type="button" onClick={() => setEditingList("")}>Annulla</button>
                            </form>
                          ) : (
                            <span>{data.name}</span>
                          )}
                        </td>
                        <td>{data.userId}</td>
                        <td>{data.count}</td>
                        <td>
                          {editingList !== cat.name && (
                            <button className="btn btn-sm btn-outline-warning me-2" title="Modifica nome" onClick={() => {setEditingList(cat.name); setEditedName(cat.name);}}>
                              <i className="bi bi-pencil"></i>
                            </button>
                          )}
                          {data.hasTodos && (
                            <button className="btn btn-sm btn-outline-primary me-2" title="Vai ai todo" onClick={() => { onGoToTodos(); navigate(`/category/${cat.name}`); }}>
                              <i className="bi bi-list-check"></i>
                            </button>
                          )}
                          <button className="btn btn-sm btn-outline-danger" title="Elimina lista" onClick={async () => { await deleteList(cat.id); refetch(); }}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
