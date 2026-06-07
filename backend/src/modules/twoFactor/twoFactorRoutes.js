const express = require('express');
const { twoFactorController } = require('./twoFactorController.js');
const { authMiddleware } = require('../../middleware/authMiddleware.js');
const router = express.Router();

// Setup 2FA
router.post('/setup', authMiddleware, twoFactorController.setupTwoFactor);

// Verify 2FA setup
router.post('/verify', authMiddleware, twoFactorController.verifyTwoFactor);

// Check status
router.get('/status', authMiddleware, twoFactorController.checkTwoFactorStatus);

// Verify login token
router.post('/verify-login', twoFactorController.verifyLoginToken);

// Disable 2FA
router.post('/disable', authMiddleware, twoFactorController.disableTwoFactor);

module.exports = router;