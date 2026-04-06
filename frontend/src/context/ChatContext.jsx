import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

const BASE_URL = 'http://localhost:5000/api';
const SOCKET_URL = 'http://localhost:5000';

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('chatUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/messages`);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
      fetchUsers();
      setLoading(false);

      const socket = io(SOCKET_URL);

      socket.on('messageReceived', (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });

      socket.on('messageUpdated', (updatedMsg) => {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === updatedMsg._id ? updatedMsg : msg))
        );
      });

      return () => socket.disconnect();
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, { email, password });
      setUser(data);
      localStorage.setItem('chatUser', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/register`, { username, email, password });
      setUser(data);
      localStorage.setItem('chatUser', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
  };

  const sendMessage = async (content) => {
    if (!user) return;
    try {
      await axios.post(`${BASE_URL}/messages`, { 
        content, 
        sender: user._id,
        senderName: user.username 
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const togglePin = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/messages/${id}/pin`);
    } catch (error) {
      console.error('Error pinning message:', error);
    }
  };

  const deleteMessage = async (id, type) => {
    try {
      await axios.delete(`${BASE_URL}/messages/${id}?type=${type}&userId=${user._id}`);
      
      if (type === 'me') {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === id ? { ...msg, deletedFor: [...msg.deletedFor, user._id] } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const value = {
    messages,
    allUsers: allUsers.filter(u => u._id !== user?._id),
    loading,
    user,
    login,
    register,
    logout,
    sendMessage,
    togglePin,
    deleteMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
