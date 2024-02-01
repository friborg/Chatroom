// src/components/NewChat.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface User {
  id: number;
  username: string;
  password: string;
}

interface SearchResult {
  id: number;
  username: string;
}

const API_URL = 'https://localhost:7281';

const NewChat: React.FC = () => {
  const user: User | null = useSelector((state: { user: User | null }) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm.trim() !== '') {
          const response = await axios.get(`${API_URL}/user/${searchTerm}`);
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleUserSelect = (result: SearchResult) => {
    setSelectedUser(result);
  };

  const handleChatCreation = async () => {
    try {
      if (selectedUser) {
        // Create a new chat with the selected user
        const response = await axios.post(`${API_URL}/chats`, {
          participants: [user?.id, selectedUser.id],
        });

        // Handle the response, e.g., redirect to the new chat page
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
          Search for a user:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        {searchResults.length > 0 && (
          <div>
            <label>Select a user:</label>
            <select onChange={(e) => handleUserSelect(searchResults.find((user) => user.id === +e.target.value)!)}>
              <option value="" disabled>Select a user</option>
              {searchResults.map((result) => (
                <option key={result.id} value={result.id} selected={selectedUser?.id === result.id}>
                  {result.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" disabled={!selectedUser}>Start Chat</button>
      </form>
    </div>
  );
};

export default NewChat;
