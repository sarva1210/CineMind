const crypto = require('crypto');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const twoFactorService = {
  // Generate 2FA secret
  async generateSecret(username, email) {
    const secret = speakeasy.generateSecret({
      name: `CineMind (${email})`,
      issuer: 'CineMind',
      length: 32,
    });

    // Generate QR code
    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    return {
      secret: secret.base32,
      qrCode,
      backupCodes: this.generateBackupCodes(),
    };
  },

  // Verify 2FA token
  verifyToken(secret, token) {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2, // Allow 2 windows (30 seconds each way)
    });
  },

  // Generate backup codes
  generateBackupCodes() {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(crypto.randomBytes(4).toString('hex').toUpperCase());
    }
    return codes;
  },

  // Validate backup code
  validateBackupCode(backupCodes, code) {
    const index = backupCodes.indexOf(code);
    if (index !== -1) {
      backupCodes.splice(index, 1); // Remove used code
      return true;
    }
    return false;
  },
};

module.exports = twoFactorService;
