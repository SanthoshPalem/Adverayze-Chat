import React from 'react';
import { useChat } from '../context/ChatContext';
import { Pin, Trash2, PinOff } from 'lucide-react';
import { format } from 'date-fns';

const MessageItem = ({ message }) => {
  const { user, togglePin, deleteMessage } = useChat();
  const isMe = message.sender === user?._id;
  
  // Check if deleted for everyone or specifically for me
  const isDeletedForMe = message.deletedFor?.includes(user?._id);
  const isDeleted = message.isDeletedForEveryone || isDeletedForMe;

  return (
    <div className={`message-item ${message.isPinned ? 'pinned' : ''} ${isMe ? 'message-own' : ''}`}>
      <div className="message-main">
        {!isMe && <span className="sender-name">{message.senderName}</span>}
        <p className={`message-content ${isDeleted ? 'message-deleted' : ''}`}>
          {isDeleted ? 'This message was deleted' : message.content}
        </p>
        <span className="message-time">
          {format(new Date(message.timestamp), 'p')}
        </span>
      </div>

      {!isDeleted && (
        <div className="message-actions">
          <button 
            onClick={() => togglePin(message._id)}
            className={`icon-btn btn-pin ${message.isPinned ? 'active' : ''}`}
            title={message.isPinned ? "Unpin" : "Pin"}
          >
            {message.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
          </button>

          <div className="dropdown">
            <button className="icon-btn">
              <Trash2 size={16} />
            </button>
            <div className="dropdown-content">
              <button 
                onClick={() => deleteMessage(message._id, 'me')}
                className="dropdown-item"
              >
                Delete for Me
              </button>
              {isMe && (
                <button 
                  onClick={() => deleteMessage(message._id, 'everyone')}
                  className="dropdown-item danger"
                >
                  Delete for Everyone
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
