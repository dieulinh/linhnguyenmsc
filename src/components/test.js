import { createSyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFail } from './authSlice';

export const loginUser = createSyncThunk('auth/loginUser', async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to log in.');
  }

  return data.user;
}, {
  onSuccess: loginSuccess.type,
  onError: loginFail.type
});
