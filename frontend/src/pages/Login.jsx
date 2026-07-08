import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSuccess } from '../store/slices/authSlice';
import { API_BASE_URL } from '../config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });

      setLoading(false);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-[#090514] overflow-hidden px-4 py-16">
      
      {/* Esoteric Glow Effects */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,70,122,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,181,106,0.06)_0%,transparent_70%)] blur-2xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[420px] bg-[#130f24]/60 backdrop-blur-xl border border-[#D9B56A]/20 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#D9B56A]/45"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="text-[#D9B56A] text-[12px] font-medium tracking-[3px] uppercase font-sans">
            Cosmic Connection
          </span>
          <h2 className="font-['Cinzel'] text-3xl font-normal text-center text-[#F4F0EA] tracking-wide mt-2">
            Welcome Back
          </h2>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg font-sans">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-5 font-sans">
          <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-300 text-[14px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-8 font-sans relative">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] font-medium">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-300 text-[14px] pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D9B56A] cursor-pointer transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        {/* Login Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-lg bg-[#D9B56A] text-[#0A0713] font-semibold font-sans uppercase tracking-[1px] text-[13px] transition-all duration-300 hover:bg-[#F4F0EA] hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(217,181,106,0.15)] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>


      </form>
    </div>
  );
}
