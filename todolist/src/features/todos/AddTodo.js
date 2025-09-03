import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTodoMutation } from "./todosApi";
import { useGetListsQuery, useAddListMutation } from "../lists/listsApi";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const { data: categories = [], refetch: refetchLists } = useGetListsQuery();
  const [addList] = useAddListMutation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [addTodo] = useAddTodoMutation();
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    let listId = null;
    let selectedList = categories.find(cat => cat.name === category && (currentUser.isAdmin || cat.user_id === currentUser.id));
    if (!selectedList && category.trim()) {
      // Crea nuova lista se non esiste
      const res = await addList({ name: category });
      await refetchLists();
      // Trova la lista appena creata
      selectedList = res.data ? res.data : categories.find(cat => cat.name === category);
    }
    if (selectedList) {
      listId = selectedList.id;
    }
    await addTodo({
      title: name,
      description: "", // puoi aggiungere campo descrizione se serve
      listId,
      userId: currentUser ? currentUser.id : null
    });
    setName("");
    setCategory("");
  }
  return (
    <form className="row g-2 mb-3 animate__animated animate__fadeIn" onSubmit={handleAddTodo} style={{background: 'linear-gradient(90deg, #f8fafc 80%, #e0e7ff 100%)', borderRadius: '1rem', boxShadow: '0 2px 16px rgba(56,189,248,0.08)'}}>
      <div className="col-md-7">
        <input
          className="form-control border-2 border-primary-subtle shadow-sm"
          style={{fontSize: '1.1rem', borderRadius: '0.75rem'}}
          placeholder="Aggiungi task..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <select
          className="form-select mb-1 border-2 border-primary-subtle shadow-sm"
          style={{borderRadius: '0.75rem'}}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Seleziona argomento...</option>
          {categories
            .filter(cat => currentUser && (currentUser.isAdmin || cat.user_id === currentUser.id))
            .map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
        </select>
        <input
          className="form-control mt-1 border-2 border-primary-subtle shadow-sm"
          style={{borderRadius: '0.75rem'}}
          placeholder="Nuovo argomento (opzionale)"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>
      <div className="col-md-2 d-grid">
        <button className="btn btn-gradient text-white fw-bold shadow" type="submit" style={{borderRadius: '0.75rem', fontSize: '1.1rem', background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)', border: 'none'}}>
          <i className="bi bi-plus-circle me-1"></i> Aggiungi
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
