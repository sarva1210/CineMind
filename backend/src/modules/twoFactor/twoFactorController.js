const TwoFactor = require('./twoFactorModel.js');
const twoFactorService = require('../../services/twoFactorService.js');
const { apiResponse } = require('../../utils/apiResponse.js');

const twoFactorController = {
  // Setup 2FA
  async setupTwoFactor(req, res, next) {
    try {
      const userId = req.user._id;
      const user = req.user;

      // Generate secret
      const { secret, qrCode, backupCodes } = await twoFactorService.generateSecret(
        user.username,
        user.email
      );

      // Store temporarily (not enabled yet)
      let twoFactorRecord = await TwoFactor.findOne({ userId });
      if (!twoFactorRecord) {
        twoFactorRecord = new TwoFactor({
          userId,
          secret,
          backupCodes,
          isEnabled: false,
        });
      } else {
        twoFactorRecord.secret = secret;
        twoFactorRecord.backupCodes = backupCodes;
      }
      await twoFactorRecord.save();

      res.status(200).json(
        apiResponse(true, '2FA setup initiated', {
          qrCode,
          secret,
          backupCodes,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Verify 2FA setup
  async verifyTwoFactor(req, res, next) {
    try {
      const { token } = req.body;
      const userId = req.user._id;

      const twoFactorRecord = await TwoFactor.findOne({ userId });
      if (!twoFactorRecord) {
        return res.status(400).json(apiResponse(false, '2FA not initialized'));
      }

      // Verify token
      const isValid = twoFactorService.verifyToken(twoFactorRecord.secret, token);
      if (!isValid) {
        return res.status(400).json(apiResponse(false, 'Invalid verification code'));
      }

      // Enable 2FA
      twoFactorRecord.isEnabled = true;
      twoFactorRecord.verifiedAt = new Date();
      await twoFactorRecord.save();

      res.status(200).json(apiResponse(true, '2FA enabled successfully', { backupCodes: twoFactorRecord.backupCodes }));
    } catch (error) {
      next(error);
    }
  },

  // Check 2FA status
  async checkTwoFactorStatus(req, res, next) {
    try {
      const userId = req.user._id;
      const twoFactorRecord = await TwoFactor.findOne({ userId });

      res.status(200).json(
        apiResponse(true, 'Status checked', {
          isEnabled: twoFactorRecord?.isEnabled || false,
          verifiedAt: twoFactorRecord?.verifiedAt,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Verify 2FA during login
  async verifyLoginToken(req, res, next) {
    try {
      const { userId, token } = req.body;

      const twoFactorRecord = await TwoFactor.findOne({ userId });
      if (!twoFactorRecord || !twoFactorRecord.isEnabled) {
        return res.status(400).json(apiResponse(false, '2FA not enabled'));
      }

      // Try token first
      let isValid = twoFactorService.verifyToken(twoFactorRecord.secret, token);

      // Try backup code if token fails
      if (!isValid) {
        isValid = twoFactorService.validateBackupCode(twoFactorRecord.backupCodes, token);
        if (isValid) {
          await twoFactorRecord.save();
        }
      }

      if (!isValid) {
        return res.status(400).json(apiResponse(false, 'Invalid verification code'));
      }

      res.status(200).json(apiResponse(true, 'Verified successfully'));
    } catch (error) {
      next(error);
    }
  },

  // Disable 2FA
  async disableTwoFactor(req, res, next) {
    try {
      const { password } = req.body;
      const userId = req.user._id;

      // Verify password before disabling
      const user = await require('../../modules/user/userModel').findById(userId);
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json(apiResponse(false, 'Invalid password'));
      }

      await TwoFactor.findOneAndUpdate({ userId }, { isEnabled: false, secret: null });

      res.status(200).json(apiResponse(true, '2FA disabled successfully'));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { twoFactorController };
