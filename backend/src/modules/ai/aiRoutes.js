const express = require('express');
const router = express.Router();
const { aiChat } = require('./aiController');

// POST /ai/chat : Get AI recommendations (no auth required)
router.post('/chat', aiChat);

module.exports = router;