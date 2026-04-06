import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { Send } from 'lucide-react';

const ChatInput = () => {
  const [content, setContent] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    sendMessage(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="send-btn"
        disabled={!content.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
