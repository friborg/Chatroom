import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NewChat from './NewChat';

interface User {
  id: number;
  username: string;
  password: string;
}

interface Message {
  id: number;
  text: string;
  user: User;
}

interface Chat {
  id: number;
  participants: User[];
  messages: Message[];
}

const API_URL = 'https://localhost:7281';

const ChatRoom: React.FC = () => {
  const user: User | null = useSelector((state: { user: User | null }) => state.user);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/${user?.id}`);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
      <NewChat></NewChat>
      <div>
        <h2>Your chats:</h2>
        {chats.map((chat) => (
          <div key={chat.id}>
            <h2>Chat {chat.id}</h2>
            <h3>Participants:</h3>
            <ul>
              {chat.participants.map((participant) => (
                <li key={participant.id}>{participant.username}</li>
              ))}
            </ul>
            <ul>
              {chat.messages.map((message) => (
                <li key={message.id}>Message:{message.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
