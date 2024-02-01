// App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';

interface User {
  id: number;
  username: string;
  password: string;
}

const App: React.FC = () => {
  const user: User | null = useSelector((state: { user: User | null }) => state.user);

  return (
    <div>
      {user ? (
        <ChatRoom />
      ) : (
        <div>
          <Login />
          <hr />
          <Register />
        </div>
      )}
    </div>
  );
};

export default App;
