// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { UseDispatch, useDispatch } from 'react-redux';

interface User {
    id: number;
    username: string;
    password: string;
}

const API_URL = 'https://localhost:7281';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            if (username.trim() === '' || password.trim() === '') {
                alert('Please enter a username and a password.');
                return;
            }

            const response = await axios.get(`${API_URL}/user/${username}`)
            const user: User = response.data;

            if (user && user.password === password) {
                dispatch({ type: 'SET_USER', payload: user });
                console.log('Login successful. User:', user)
            }
            else {
                alert('Invalid username and password combo')
            }
        } catch (error) {
            console.error('Error during login:', error);
        }

    };

    return (
        <div>
            <h2>Login</h2>
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
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
