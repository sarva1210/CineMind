import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaKey, FaCopy, FaCheck } from 'react-icons/fa';

export default function TwoFactorSetup({ onSetupComplete }) {
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState(null);
  const [backupCodes, setBackupCodes] = useState([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/two-factor/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setQrCode(data.data.qrCode);
      setBackupCodes(data.data.backupCodes);
      setStep(2);
    } catch (error) {
      console.error('Error setting up 2FA:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/two-factor/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: verificationCode }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(3);
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaKey /> Two-Factor Authentication
        </h2>

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-300 mb-6">
              Secure your account with two-factor authentication. You'll need an authenticator app.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSetup}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg"
            >
              {loading ? 'Setting up...' : 'Start Setup'}
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-4">1. Scan this QR code with your authenticator app:</p>
              {qrCode && <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto border border-purple-500" />}
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">2. Enter the 6-digit code from your app:</p>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                className="w-full bg-gray-900 border border-purple-500/30 rounded px-4 py-2 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-purple-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleVerify}
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg"
            >
              {loading ? 'Verifying...' : 'Verify & Enable'}
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
              <FaCheck className="text-green-400 text-3xl mx-auto mb-2" />
              <p className="text-green-300 font-semibold">2FA Enabled Successfully!</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Save your backup codes in a safe place:</p>
              <div className="bg-gray-900/50 border border-purple-500/30 rounded p-4 space-y-2 mb-4">
                {backupCodes.map((code, i) => (
                  <code key={i} className="block font-mono text-sm">
                    {code}
                  </code>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={copyBackupCodes}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaCopy /> {copied ? 'Copied!' : 'Copy Backup Codes'}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onSetupComplete}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg"
            >
              Done
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
