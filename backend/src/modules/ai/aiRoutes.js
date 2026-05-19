const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { aiChat } = require('./aiController');

// POST /ai/chat : to  Get AI recommendations
router.post('/chat', authMiddleware, aiChat);

module.exports = router;