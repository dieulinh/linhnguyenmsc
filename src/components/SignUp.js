import React, { useState } from "react";
import { signUp } from "../features/session/sessionSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

   // Grab the navigate function
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
     axios.post('http://localhost:5000/api/register', {email,password})
      .then((response) => {
        if(response.status == 201) {
          dispatch(signUp({ email: email }));
          console.log('Register successfully')
          setTimeout(() => {
            navigate('/login')
          },200)
        } else {
          console.log('Failed to login', response.data)
        }

      })
      .catch((err) => console.log(err))

    // dispatch(signUp({username: username}));
    // navigate('/profile')
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
          Sign Up
        </button>
      </form>
    </section>
  );
}
