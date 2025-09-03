import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import authReducer from '../features/auth/authSlice';
import { listsApi } from '../features/lists/listsApi';
import { todosApi } from '../features/todos/todosApi';
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    [listsApi.reducerPath]: listsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listsApi.middleware, todosApi.middleware),
});

