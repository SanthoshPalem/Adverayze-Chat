import React from 'react';
import { useChat } from '../context/ChatContext';
import { User } from 'lucide-react';

const Sidebar = () => {
  const { allUsers } = useChat();

  return (
    <div className="chat-sidebar">
      <h3 className="sidebar-title">Other Users</h3>
      <div className="users-list">
        {allUsers.length === 0 ? (
          <p className="no-users">No other users yet.</p>
        ) : (
          allUsers.map((u) => (
            <div key={u._id} className="user-item">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <span className="user-name">{u.username}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
