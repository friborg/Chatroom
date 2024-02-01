// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';


interface User {
  id: number;
  username: string;
  password: string;
}

const API_URL = 'https://localhost:7281';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (username.trim() === '' || password.trim() === '') {
          alert('Please enter a username and a password.');
          return;
      }

      const response = await axios.post(`${API_URL}/user/`, {username, password})
      console.log('API response', response.data);

  } catch (error) {
      console.error('Error during login:', error);
  }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
