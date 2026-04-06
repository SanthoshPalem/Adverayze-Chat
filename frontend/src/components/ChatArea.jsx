import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import MessageItem from './MessageItem';

const ChatArea = () => {
  const { messages, loading } = useChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="chat-area empty-state">
        <p>Loading messages...</p>
      </div>
    );
  }

  const pinnedMessages = messages.filter(m => m.isPinned);
  const otherMessages = messages.filter(m => !m.isPinned);

  return (
    <div className="chat-area" ref={scrollRef}>
      {/* Pinned Section */}
      {pinnedMessages.length > 0 && (
        <div className="pinned-section">
          <span className="section-title">Pinned Messages</span>
          <div className="pinned-list">
            {pinnedMessages.map(msg => (
              <MessageItem key={msg._id} message={msg} />
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="messages-list">
        {otherMessages.length === 0 && pinnedMessages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet.</p>
            <p style={{ fontSize: '0.85rem' }}>Start the conversation below!</p>
          </div>
        ) : (
          otherMessages.map((msg) => (
            <MessageItem key={msg._id} message={msg} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatArea;
