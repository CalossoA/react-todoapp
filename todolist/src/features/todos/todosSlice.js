
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [
        { id: Date.now().toString() + Math.random().toString(36).slice(2), name: 'Learn Redux', completed: false, userId:1, category: 'Default' },
        { id: (Date.now()+1).toString() + Math.random().toString(36).slice(2), name: 'Build a Redux app', completed: true, userId:1, category: 'Default' }
    ],
        lists: [{ name: 'Default', userId: 1 }]
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
            addTodo(state, action){
                state.todos.push(action.payload);
                if (action.payload.category && !state.lists.some(l => l.name === action.payload.category)) {
                    state.lists.push({ name: action.payload.category, userId: action.payload.userId });
                }
            },
            addList(state, action){
                if (action.payload.category && !state.lists.some(l => l.name === action.payload.category)) {
                    state.lists.push({ name: action.payload.category, userId: action.payload.userId });
                }
            },
        removeTodo(state, action){
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
            removeList(state, action){
                state.todos = state.todos.filter(todo => todo.category !== action.payload.category);
                state.lists = state.lists.filter(l => l.name !== action.payload.category);
            },
        toggleTodo(state, action){
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo(state, action){
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.name = action.payload.name;
            }
        },
            editList(state, action){
                const idx = state.lists.findIndex(l => l.name === action.payload.oldCategory);
                if (idx !== -1) {
                    state.lists[idx].name = action.payload.newCategory;
                    state.todos.forEach(todo => {
                        if (todo.category === action.payload.oldCategory) {
                            todo.category = action.payload.newCategory;
                        }
                    });
                }
            }
    }
});

export const {addTodo, removeTodo, toggleTodo, addList, removeList, editTodo, editList} = todoSlice.actions;
export default todoSlice.reducer;

