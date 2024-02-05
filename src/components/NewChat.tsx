// src/components/NewChat.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface User {
  id: number;
  username: string;
  password: string;
}

const API_URL = 'https://localhost:7281';

const NewChat: React.FC = () => {
  const user: User | null = useSelector((state: { user: User | null }) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId: number) => {
    const selected = users.find((user) => user.id === userId);
    setSelectedUser(selected || null);
  };

  const handleChatCreation = async () => {
    try {
      if (selectedUser && user) {
        const response = await axios.post(`${API_URL}/chat/${user.id},${selectedUser.id}`);
  
        console.log('New chat created:', response.data);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  
  

  return (
    <div>
      <h2>New Chat</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleChatCreation(); }}>
        <label>
          Select a user:
          <select onChange={(e) => handleUserSelect(+e.target.value)}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={!selectedUser}>Start Chat</button>
      </form>
    </div>
  );
};

export default NewChat;
