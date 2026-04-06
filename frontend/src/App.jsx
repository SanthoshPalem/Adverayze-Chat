import React, { useState } from 'react';
import { ChatProvider, useChat } from './context/ChatContext';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import { LogOut } from 'lucide-react';
import './index.css';

const MainApp = () => {
  const { user, logout } = useChat();
  const [view, setView] = useState('login'); // 'login' or 'signup'

  if (!user) {
    return view === 'login' 
      ? <Login switchToSignup={() => setView('signup')} /> 
      : <Signup switchToLogin={() => setView('login')} />;
  }

  return (
    <div className="chat-container">
      <div className="chat-window">
        <header className="chat-header">
          <div className="header-content">
            <h1>Adverayze Chat</h1>
            <div className="user-info">
              <span>Logged as: <strong>{user.username}</strong></span>
              <button onClick={logout} className="logout-btn">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="chat-body">
          <Sidebar />
          <ChatArea />
        </div>

        <ChatInput />
      </div>
    </div>
  );
};

function App() {
  return (
    <ChatProvider>
      <MainApp />
    </ChatProvider>
  );
}

export default App;
