import React, { useState } from "react";
import { signUp } from "../features/session/sessionSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';

import {loginFailed, loginSuccess,loginUser} from "../features/auth/authSlice";
import {selectIsLoggedIn, selectCurrentUser } from "../features/auth/authSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Grab the navigate function
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password }));

      // Redirect to the main page on successful login
    } catch (error) {
      // Display an error message
      console.log(error.message())
    }
  }

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>

        <label>
          Username
          <div>
            <input
              id="username"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

          </div>
        </label>
        <label>
          Password
          <input
            id="password" type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)} />
        </label>
        <button type="submit" className="primary">
          Log In
        </button>
      </form>
    </section>
  );
}
