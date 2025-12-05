"use client"

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { COLORS } from '../../constants/colors';

const Verification = ({ email, onVerify, onResend }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-focus next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    onVerify(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.bgLight }}>
      <div className="w-full max-w-lg rounded-lg shadow-lg p-8" style={{ backgroundColor: COLORS.bgWhite }}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Mail className="w-16 h-16" style={{ color: COLORS.primary }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
            Verify Your Email
          </h1>
          <p className="text-gray-600">Enter the 6-digit code sent to {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: error ? COLORS.danger : COLORS.border }}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm mt-1 text-center" style={{ color: COLORS.danger }}>{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: COLORS.primary }}
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn't receive a code?{' '}
            <button
              onClick={onResend}
              className="font-semibold hover:underline"
              style={{ color: COLORS.primary }}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;