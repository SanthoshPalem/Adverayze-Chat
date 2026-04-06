const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { content, sender, senderName } = req.body;
    
    // Validation
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Message content cannot be empty' });
    }
    if (content.length > 1000) {
      return res.status(400).json({ message: 'Message is too long (max 1000 characters)' });
    }
    if (!sender || !senderName) {
      return res.status(400).json({ message: 'Sender information is missing' });
    }

    const message = await Message.create({ 
      content: content.trim(), 
      sender, 
      senderName 
    });
    
    const io = req.app.get('socketio');
    io.emit('messageReceived', message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const togglePin = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.isPinned = !message.isPinned;
    await message.save();

    const io = req.app.get('socketio');
    io.emit('messageUpdated', message);

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { type, userId } = req.query; 
  
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    if (type === 'everyone') {
      message.isDeletedForEveryone = true;
      message.content = 'This message was deleted'; 
      await message.save();
      
      const io = req.app.get('socketio');
      io.emit('messageUpdated', message);
    } else {
      // Delete for Me
      if (!userId) return res.status(400).json({ message: 'User ID is required' });
      if (!message.deletedFor.includes(userId)) {
        message.deletedFor.push(userId);
        await message.save();
      }
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, createMessage, togglePin, deleteMessage };
