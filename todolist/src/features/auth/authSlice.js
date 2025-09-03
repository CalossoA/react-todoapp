
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authServices from '../../services/authServices';

let currentUser = null;
const token = localStorage.getItem('token');
if (token) {
  // Decodifica il token per ottenere i dati utente (semplificato, puoi usare jwt-decode)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    currentUser = {
      ...payload,
      isAdmin: payload.email === 'admin',
      token,
    };
  } catch (e) {
    currentUser = null;
  }
}
const initialState = {
  currentUser,
  loading: false,
  error: null,
};

// AsyncThunks
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authServices.register(userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Errore registrazione');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authServices.login(userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Errore login');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    authServices.logout();
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          ...action.payload,
          isAdmin: action.payload.email === 'admin'
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          ...action.payload,
          isAdmin: action.payload.email === 'admin'
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
