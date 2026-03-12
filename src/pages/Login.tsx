import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#2D7272] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-light tracking-widest text-white">VIZZ EYES</h1>
          <p className="text-white/40 text-sm tracking-widest mt-2">ADMIN PANEL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {error && (
            <div className="text-red-300 text-sm text-center bg-red-500/20 rounded-xl py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs tracking-widest text-white/50 mb-2 uppercase">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-white/20 rounded-xl px-4 py-3 text-sm text-white bg-white/10 focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest text-white/50 mb-2 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/20 rounded-xl px-4 py-3 text-sm text-white bg-white/10 focus:outline-none focus:border-white/40 transition-colors placeholder-white/30"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-[#2D7272] py-3 rounded-xl hover:bg-white/90 transition-colors text-sm tracking-widest font-medium"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-10 p-4 bg-white/10 rounded-xl border border-white/10">
          <p className="text-xs text-white/40 tracking-wider text-center mb-3">DEMO CREDENTIALS</p>
          <div className="space-y-1 text-xs text-white/60 font-mono">
            <p><span className="text-white">admin</span> / admin123 — full access</p>
            <p><span className="text-white">editor</span> / editor123 — upload only</p>
            <p><span className="text-white">viewer</span> / viewer123 — view only</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
