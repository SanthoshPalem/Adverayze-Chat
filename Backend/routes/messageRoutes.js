const express = require('express');
const router = express.Router();
const { 
  getMessages, 
  createMessage, 
  togglePin, 
  deleteMessage 
} = require('../controllers/messageController');

router.get('/', getMessages);
router.post('/', createMessage);
router.patch('/:id/pin', togglePin);
router.delete('/:id', deleteMessage);

module.exports = router;
