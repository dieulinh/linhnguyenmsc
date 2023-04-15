import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const authUser = async ({email,password}) => {
  const authenticated = await axios.post('http://localhost:5000/api/login',{email,password});
  const json = await authenticated.json();
  return json;
}

export const loginUser = createAsyncThunk('auth/loginUser',
  async ({email,password}, thunkAPI) => {
    const response = await authUser({email, password});
    const json = await response.json();
    if (!json.ok) {
      throw new Error(json.message || 'Unable to login')
    }
    return json.user;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    hasError: false
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed(state, action) {
      state.user = null;
      state.isAuthenticated = false
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.isAuthenticated = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log('success login')
      state.user = action.payload;
      state.isLoading = false;
      state.hasError = false
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.hasError = true;
      state.isLoading = false;
      state.isAuthenticated = false;
    }
  }
})
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
export const { loginSuccess, loginFailed } = authSlice.actions;